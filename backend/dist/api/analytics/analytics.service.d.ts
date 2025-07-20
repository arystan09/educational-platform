import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { Certificate } from '../certificates/entities/certificate.entity';
import { QuizResult } from '../quizzes/entities/quiz-result.entity';
import { AssignmentSubmission } from '../assignments/entites/assignment-submission.entity';
import { DateRangeDto } from './dto/date-range.dto';
export declare class AnalyticsService {
    private userRepo;
    private courseRepo;
    private enrollRepo;
    private certRepo;
    private quizResultRepo;
    private submissionRepo;
    constructor(userRepo: Repository<User>, courseRepo: Repository<Course>, enrollRepo: Repository<Enrollment>, certRepo: Repository<Certificate>, quizResultRepo: Repository<QuizResult>, submissionRepo: Repository<AssignmentSubmission>);
    getUserStats({ from, to }: DateRangeDto): Promise<{
        totalUsers: number;
        newUsers: number;
    }>;
    getCourseStats({ from, to }: DateRangeDto): Promise<{
        totalEnrollments: number;
        topCourses: any[];
        completedCourses: number;
    }>;
    getQuizStats({ from, to }: DateRangeDto): Promise<{
        totalQuizzes: number;
        averageScore: number;
    }>;
    getCertificateStats({ from, to }: DateRangeDto): Promise<any[]>;
    getAssignmentStats({ from, to }: DateRangeDto): Promise<{
        totalSubmissions: number;
        reviewed: number;
        pending: number;
    }>;
}
