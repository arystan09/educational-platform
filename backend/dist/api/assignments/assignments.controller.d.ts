import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { GradeAssignmentDto } from './dto/grade-assignment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(dto: CreateAssignmentDto): Promise<import("./entites/assignment.entity").Assignment>;
    submit(dto: SubmitAssignmentDto, req: any): Promise<import("./entites/assignment-submission.entity").AssignmentSubmission>;
    grade(dto: GradeAssignmentDto): Promise<import("./entites/assignment-submission.entity").AssignmentSubmission>;
    updateStatus(dto: UpdateStatusDto): Promise<import("./entites/assignment-submission.entity").AssignmentSubmission>;
    getByCourse(courseId: string): Promise<import("./entites/assignment.entity").Assignment[]>;
    getSubmissions(id: string): Promise<import("./entites/assignment-submission.entity").AssignmentSubmission[]>;
    getMy(req: any): Promise<import("./entites/assignment-submission.entity").AssignmentSubmission[]>;
}
