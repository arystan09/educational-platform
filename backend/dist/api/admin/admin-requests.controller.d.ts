import { EnrollmentService } from '../enrollment/enrollment.service';
export declare class AdminRequestsController {
    private readonly requestService;
    constructor(requestService: EnrollmentService);
    getAll(): Promise<import("../enrollment/entities/enrollment.entity").Enrollment[]>;
    approve(id: string): Promise<import("../enrollment/entities/enrollment.entity").Enrollment>;
    reject(id: string): Promise<import("../enrollment/entities/enrollment.entity").Enrollment>;
}
