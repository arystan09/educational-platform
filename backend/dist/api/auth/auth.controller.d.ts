import { AuthService } from './auth.service';
declare class RegisterDto {
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
    register(body: RegisterDto): Promise<import("../users/entities/user.entity").User>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
}
export {};
