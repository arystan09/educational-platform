import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { GrantCourseAccessDto } from './dto/grant-course-access.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class AdminService {
    private readonly userRepo;
    private readonly courseRepo;
    private readonly enrollmentRepo;
    constructor(userRepo: Repository<User>, courseRepo: Repository<Course>, enrollmentRepo: Repository<Enrollment>);
    getAllUsers(): Promise<User[]>;
    updateUserRole(id: string, dto: UpdateUserRoleDto): Promise<User>;
    grantCourseAccess(dto: GrantCourseAccessDto): Promise<Enrollment>;
    revokeCourseAccess(userId: string, courseId: string): Promise<{
        message: string;
    }>;
    getUserEnrollments(userId: string): Promise<Enrollment[]>;
    getAllEnrollments(): Promise<Enrollment[]>;
}
