import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../services/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const existing = await this.usersRepo.findOne({ where: { email } });
    
    // If user exists but email is not verified, allow re-registration
    if (existing && existing.emailVerified) {
      throw new ConflictException('Email уже зарегистрирован и подтвержден');
    }
    
    // If user exists but not verified, update the existing user
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
      
      // Send verification email
      try {
        await this.emailService.sendVerificationEmail(email, verificationToken, savedUser.name);
      } catch (error) {
        console.error('Failed to send verification email:', error);
        return {
          user: savedUser,
          message: 'Регистрация успешна! Проверьте вашу почту для подтверждения email.',
          verificationToken: verificationToken // For development/testing only
        };
      }

      return {
        user: savedUser,
        message: 'Регистрация обновлена! Проверьте вашу почту для подтверждения email.',
        verificationToken: verificationToken // For development/testing only
      };
    }

    // Create new user
    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = this.generateVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    const user = this.usersRepo.create({ 
      email, 
      password: hashed,
      name: name || 'Unnamed',
      role: Role.STUDENT,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires
    });
    const savedUser = await this.usersRepo.save(user);
    
    // Send verification email
    try {
      await this.emailService.sendVerificationEmail(email, verificationToken, savedUser.name);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return {
        user: savedUser,
        message: 'Регистрация успешна! Проверьте вашу почту для подтверждения email.',
        verificationToken: verificationToken // For development/testing only
      };
    }

    return {
      user: savedUser,
      message: 'Регистрация успешна! Проверьте вашу почту для подтверждения email.',
      verificationToken: verificationToken // For development/testing only
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Неверный логин или пароль');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Неверный логин или пароль');

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

  async getCurrentUser(userPayload: any) {
    const user = await this.usersRepo.findOne({ where: { id: userPayload.sub } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  async verifyEmail(token: string) {
    const user = await this.usersRepo.findOne({ 
      where: { 
        emailVerificationToken: token,
        emailVerified: false 
      } 
    });

    if (!user) {
      throw new UnauthorizedException('Неверный токен подтверждения');
    }

    if (user.emailVerificationExpires < new Date()) {
      throw new UnauthorizedException('Токен подтверждения истек');
    }

    user.emailVerified = true;
    user.emailVerificationToken = null as any;
    user.emailVerificationExpires = null as any;
    await this.usersRepo.save(user);

    return {
      message: 'Email успешно подтвержден! Теперь вы можете войти в систему.',
      user
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    if (user.emailVerified) {
      throw new UnauthorizedException('Email уже подтвержден');
    }

    const verificationToken = this.generateVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await this.usersRepo.save(user);

    // Send verification email
    try {
      await this.emailService.sendVerificationEmail(email, verificationToken, user.name);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // In development, we'll still return the token for testing
      return {
        message: 'Новый токен подтверждения отправлен на ваш email.',
        verificationToken: verificationToken // For development/testing only
      };
    }

    return {
      message: 'Новый токен подтверждения отправлен на ваш email.',
    };
  }

  async createAdmin(email: string, password: string, name?: string) {
    const existing = await this.usersRepo.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email уже зарегистрирован');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ 
      email, 
      password: hashed,
      name: name || 'Admin',
      role: Role.ADMIN,
      emailVerified: true // Admins don't need email verification
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
}
