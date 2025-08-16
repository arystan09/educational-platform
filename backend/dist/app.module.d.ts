import { OnModuleInit } from '@nestjs/common';
import { SeederService } from './database/seeder.service';
export declare class AppModule implements OnModuleInit {
    private readonly seederService;
    constructor(seederService: SeederService);
    onModuleInit(): Promise<void>;
}
