import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from './entities/application.entity';
export declare class ApplicationsController {
    private readonly service;
    constructor(service: ApplicationsService);
    apply(userId: string, dto: CreateApplicationDto): Promise<import("./entities/application.entity").Application>;
    getMyApplications(userId: string): Promise<import("./entities/application.entity").Application[]>;
    getAll(): Promise<import("./entities/application.entity").Application[]>;
    changeStatus(id: string, status: ApplicationStatus): Promise<import("./entities/application.entity").Application>;
}
