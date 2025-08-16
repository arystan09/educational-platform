import { AuthService } from './auth.service';
declare class RegisterDto {
    name?: string;
    email: string;
    password: string;
}
declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        user: import("../users/entities/user.entity").User;
        message: string;
        verificationToken: string;
    }>;
    login(body: LoginDto): Promise<{
        user: import("../users/entities/user.entity").User;
        token: string;
        message: string;
    }>;
    getCurrentUser(req: any): Promise<import("../users/entities/user.entity").User>;
    verifyEmail(body: {
        token: string;
    }): Promise<{
        message: string;
        user: import("../users/entities/user.entity").User;
    }>;
    resendVerification(body: {
        email: string;
    }): Promise<{
        message: string;
        verificationToken: string;
    } | {
        message: string;
        verificationToken?: undefined;
    }>;
    createAdmin(body: RegisterDto): Promise<{
        user: import("../users/entities/user.entity").User;
        token: string;
        message: string;
    }>;
}
export {};
