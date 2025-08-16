import { Course } from '../../courses/entites/course.entity';
import { AssignmentSubmission } from './assignment-submission.entity';
export declare class Assignment {
    id: string;
    title: string;
    description: string;
    course: Course;
    submissions: AssignmentSubmission[];
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
