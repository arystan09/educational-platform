import { Assignment } from './assignment.entity';
import { User } from '../../users/entities/user.entity';
export declare enum SubmissionStatus {
    PENDING = "PENDING",
    NEEDS_REVISION = "NEEDS_REVISION",
    GRADED = "GRADED"
}
export declare class AssignmentSubmission {
    id: string;
    assignment: Assignment;
    student: User;
    fileUrl?: string;
    textAnswer?: string;
    grade?: number;
    feedback?: string;
    status: SubmissionStatus;
    submittedAt: Date;
}
