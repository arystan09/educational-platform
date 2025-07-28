import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/review.entity';
import { Chapter } from '../../chapters/chapter.entity';
import { CourseProgress } from '../../progress/entities/course_progress.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Assignment } from '../../assignments/entites/assignment.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { Certificate } from '../../certificates/entities/certificate.entity';
export declare class Course {
    id: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    createdBy: User;
    isPublished: boolean;
    chapters: Chapter[];
    reviews: Review[];
    progress: CourseProgress[];
    assignments: Assignment[];
    enrollments: Enrollment[];
    certificates: Certificate[];
    quizzes: Quiz[];
    createdAt: Date;
    updatedAt: Date;
}
