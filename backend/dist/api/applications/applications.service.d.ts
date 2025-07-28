import { Repository } from 'typeorm';
import { Application } from '../applications/entities/application.entity';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
import { ApplicationStatus } from './entities/application.entity';
export declare class ApplicationsService {
    private appRepo;
    private courseRepo;
    private userRepo;
    constructor(appRepo: Repository<Application>, courseRepo: Repository<Course>, userRepo: Repository<User>);
    apply(userId: string, courseId: string): Promise<Application>;
    getUserApplications(userId: string): Promise<Application[]>;
    getAllApplications(): Promise<Application[]>;
    changeStatus(id: string, status: ApplicationStatus): Promise<Application>;
}
