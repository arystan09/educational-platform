import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { AdminCoursesController } from './admin-courses.controller';
import { CoursesModule } from '../courses/courses.module';
import { AdminRequestsController } from './admin-requests.controller';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { AdminReviewsController } from './admin-reviews.controller';
import { ReviewsModule } from '../reviews/reviews.module';
import { AdminCertificatesController } from './admin-certificates.controller';
import { CertificateModule } from '../certificates/certificate.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Course]),
    CoursesModule,
    EnrollmentModule,
    ReviewsModule,
    CertificateModule,
    AnalyticsModule,
  ],
  controllers: [AdminController, AdminCoursesController, AdminRequestsController, AdminReviewsController, AdminCertificatesController],
  providers: [AdminService],
})
export class AdminModule {}
