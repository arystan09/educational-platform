import { Repository } from 'typeorm';
import { Application } from '../applications/entities/application.entity';
import { Course } from '../courses/course.entity';
import { User } from '../users/user.entity';
import { ApplicationStatus } from './entities/application.entity';
export declare class ApplicationsService {
    private appRepo;
    private courseRepo;
    private userRepo;
    constructor(appRepo: Repository<Application>, courseRepo: Repository<Course>, userRepo: Repository<User>);
    apply(userId: number, courseId: number): Promise<Application>;
    getUserApplications(userId: number): Promise<Application[]>;
    getAllApplications(): Promise<Application[]>;
    changeStatus(id: number, status: ApplicationStatus): Promise<Application>;
}
