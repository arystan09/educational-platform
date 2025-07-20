import { Course } from '../../courses/entites/course.entity';
import { CourseProgress } from '../../progress/entities/course_progress.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Review } from '../../reviews/review.entity';
import { Role } from '../enums/role.enum';
import { AssignmentSubmission } from '../../assignments/entites/assignment-submission.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { Certificate } from '../../certificates/entities/certificate.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    courses: Course[];
    courseProgress: CourseProgress[];
    progress: Progress[];
    assignmentSubmissions: AssignmentSubmission[];
    notifications: Notification[];
    enrollments: Enrollment[];
    certificates: Certificate[];
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
}
