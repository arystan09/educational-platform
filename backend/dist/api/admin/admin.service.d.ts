import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { GrantCourseAccessDto } from './dto/grant-course-access.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class AdminService {
    private readonly userRepo;
    private readonly courseRepo;
    constructor(userRepo: Repository<User>, courseRepo: Repository<Course>);
    getAllUsers(): Promise<User[]>;
    updateUserRole(id: string, dto: UpdateUserRoleDto): Promise<User>;
    grantCourseAccess(dto: GrantCourseAccessDto): Promise<User>;
}
