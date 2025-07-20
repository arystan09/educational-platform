import { AnalyticsService } from './analytics.service';
import { DateRangeDto } from './dto/date-range.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getUserStats(range: DateRangeDto): Promise<{
        totalUsers: number;
        newUsers: number;
    }>;
    getCourseStats(range: DateRangeDto): Promise<{
        totalEnrollments: number;
        topCourses: any[];
        completedCourses: number;
    }>;
    getQuizStats(range: DateRangeDto): Promise<{
        totalQuizzes: number;
        averageScore: number;
    }>;
    getCertificateStats(range: DateRangeDto): Promise<any[]>;
    getAssignmentStats(range: DateRangeDto): Promise<{
        totalSubmissions: number;
        reviewed: number;
        pending: number;
    }>;
}
