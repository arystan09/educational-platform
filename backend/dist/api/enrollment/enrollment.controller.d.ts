import { EnrollmentService } from './enrollment.service';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    enroll(courseId: string, req: any): Promise<import("./entities/enrollment.entity").Enrollment>;
    getUserEnrollments(req: any): Promise<import("./entities/enrollment.entity").Enrollment[]>;
}
