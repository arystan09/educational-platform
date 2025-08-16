"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const role_enum_1 = require("../users/enums/role.enum");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../../services/email.service");
let AuthService = class AuthService {
    usersRepo;
    jwtService;
    emailService;
    constructor(usersRepo, jwtService, emailService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async register(email, password, name) {
        const existing = await this.usersRepo.findOne({ where: { email } });
        if (existing && existing.emailVerified) {
            throw new common_1.ConflictException('Email уже зарегистрирован и подтвержден');
        }
        if (existing && !existing.emailVerified) {
            const hashed = await bcrypt.hash(password, 10);
            const verificationToken = this.generateVerificationToken();
            const verificationExpires = new Date();
            verificationExpires.setHours(verificationExpires.getHours() + 24);
            existing.password = hashed;
            existing.name = name || existing.name;
            existing.emailVerificationToken = verificationToken;
            existing.emailVerificationExpires = verificationExpires;
            const savedUser = await this.usersRepo.save(existing);
            try {
                await this.emailService.sendVerificationEmail(email, verificationToken, savedUser.name);
            }
            catch (error) {
                console.error('Failed to send verification email:', error);
                return {
                    user: savedUser,
                    message: 'Регистрация успешна! Проверьте вашу почту для подтверждения email.',
                    verificationToken: verificationToken
                };
            }
            return {
                user: savedUser,
                message: 'Регистрация обновлена! Проверьте вашу почту для подтверждения email.',
                verificationToken: verificationToken
            };
        }
        const hashed = await bcrypt.hash(password, 10);
        const verificationToken = this.generateVerificationToken();
        const verificationExpires = new Date();
        verificationExpires.setHours(verificationExpires.getHours() + 24);
        const user = this.usersRepo.create({
            email,
            password: hashed,
            name: name || 'Unnamed',
            role: role_enum_1.Role.STUDENT,
            emailVerified: false,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires
        });
        const savedUser = await this.usersRepo.save(user);
        try {
            await this.emailService.sendVerificationEmail(email, verificationToken, savedUser.name);
        }
        catch (error) {
            console.error('Failed to send verification email:', error);
            return {
                user: savedUser,
                message: 'Регистрация успешна! Проверьте вашу почту для подтверждения email.',
                verificationToken: verificationToken
            };
        }
        return {
            user: savedUser,
            message: 'Регистрация успешна! Проверьте вашу почту для подтверждения email.',
            verificationToken: verificationToken
        };
    }
    async login(email, password) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException('Неверный логин или пароль');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Неверный логин или пароль');
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
        };
        return {
            user,
            token: this.jwtService.sign(payload),
            message: user.emailVerified
                ? 'Вход выполнен успешно'
                : 'Вход выполнен, но email не подтвержден. Проверьте вашу почту.',
        };
    }
    async getCurrentUser(userPayload) {
        const user = await this.usersRepo.findOne({ where: { id: userPayload.sub } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
    generateVerificationToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    async verifyEmail(token) {
        const user = await this.usersRepo.findOne({
            where: {
                emailVerificationToken: token,
                emailVerified: false
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Неверный токен подтверждения');
        }
        if (user.emailVerificationExpires < new Date()) {
            throw new common_1.UnauthorizedException('Токен подтверждения истек');
        }
        user.emailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationExpires = null;
        await this.usersRepo.save(user);
        return {
            message: 'Email успешно подтвержден! Теперь вы можете войти в систему.',
            user
        };
    }
    async resendVerificationEmail(email) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Пользователь не найден');
        }
        if (user.emailVerified) {
            throw new common_1.UnauthorizedException('Email уже подтвержден');
        }
        const verificationToken = this.generateVerificationToken();
        const verificationExpires = new Date();
        verificationExpires.setHours(verificationExpires.getHours() + 24);
        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = verificationExpires;
        await this.usersRepo.save(user);
        try {
            await this.emailService.sendVerificationEmail(email, verificationToken, user.name);
        }
        catch (error) {
            console.error('Failed to send verification email:', error);
            return {
                message: 'Новый токен подтверждения отправлен на ваш email.',
                verificationToken: verificationToken
            };
        }
        return {
            message: 'Новый токен подтверждения отправлен на ваш email.',
        };
    }
    async createAdmin(email, password, name) {
        const existing = await this.usersRepo.findOne({ where: { email } });
        if (existing) {
            throw new common_1.ConflictException('Email уже зарегистрирован');
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = this.usersRepo.create({
            email,
            password: hashed,
            name: name || 'Admin',
            role: role_enum_1.Role.ADMIN,
            emailVerified: true
        });
        const savedUser = await this.usersRepo.save(user);
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            role: savedUser.role,
        };
        return {
            user: savedUser,
            token: this.jwtService.sign(payload),
            message: 'Администратор успешно создан'
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map