import { AdminService } from './admin.service';
import { GrantCourseAccessDto } from './dto/grant-course-access.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<import("../users/entities/user.entity").User[]>;
    updateUserRole(id: string, dto: UpdateUserRoleDto): Promise<import("../users/entities/user.entity").User>;
    grantCourseAccess(dto: GrantCourseAccessDto): Promise<import("../users/entities/user.entity").User>;
}
