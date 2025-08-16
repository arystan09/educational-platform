import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendVerificationEmail(email: string, token: string, name: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string, name: string): Promise<void>;
}
