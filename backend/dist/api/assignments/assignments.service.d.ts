import { Repository } from 'typeorm';
import { Assignment } from './entites/assignment.entity';
import { AssignmentSubmission } from './entites/assignment-submission.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { GradeAssignmentDto } from './dto/grade-assignment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
export declare class AssignmentsService {
    private assignmentRepo;
    private submissionRepo;
    private courseRepo;
    private userRepo;
    constructor(assignmentRepo: Repository<Assignment>, submissionRepo: Repository<AssignmentSubmission>, courseRepo: Repository<Course>, userRepo: Repository<User>);
    getUserById(userId: string): Promise<User>;
    createAssignment(dto: CreateAssignmentDto): Promise<Assignment>;
    submitAssignment(dto: SubmitAssignmentDto, student: User): Promise<AssignmentSubmission>;
    gradeSubmission(dto: GradeAssignmentDto): Promise<AssignmentSubmission>;
    updateStatus(dto: UpdateStatusDto): Promise<AssignmentSubmission>;
    getAssignmentsForCourse(courseId: string): Promise<Assignment[]>;
    getSubmissionsForAssignment(assignmentId: string): Promise<AssignmentSubmission[]>;
    getMySubmissions(student: User): Promise<AssignmentSubmission[]>;
}
