import { AnalyticsService } from '../analytics/analytics.service';
export declare class AdminAnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getStats(): Promise<any>;
}
