import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService);
    register(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
