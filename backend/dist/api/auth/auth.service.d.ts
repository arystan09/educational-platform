import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../services/email.service';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    private emailService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService, emailService: EmailService);
    register(email: string, password: string, name?: string): Promise<{
        user: User;
        message: string;
        verificationToken: string;
    }>;
    login(email: string, password: string): Promise<{
        user: User;
        token: string;
        message: string;
    }>;
    getCurrentUser(userPayload: any): Promise<User>;
    private generateVerificationToken;
    verifyEmail(token: string): Promise<{
        message: string;
        user: User;
    }>;
    resendVerificationEmail(email: string): Promise<{
        message: string;
        verificationToken: string;
    } | {
        message: string;
        verificationToken?: undefined;
    }>;
    createAdmin(email: string, password: string, name?: string): Promise<{
        user: User;
        token: string;
        message: string;
    }>;
}
