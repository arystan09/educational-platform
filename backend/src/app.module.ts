import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Контроллеры и сервисы
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Модули
import { DatabaseModule } from './database/database.module';
import { SeederService } from './database/seeder.service';

// Модули
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { CoursesModule } from './api/courses/courses.module';
import { ChaptersModule } from './api/chapters/chapters.module';
import { ApplicationsModule } from './api/applications/applications.module';
import { ProgressModule } from './api/progress/progress.module';
import { ReviewsModule } from './api/reviews/reviews.module';
import { QuizzesModule } from './api/quizzes/quizzes.module';
import { AssignmentsModule } from './api/assignments/assignments.module';

import { EnrollmentModule } from './api/enrollment/enrollment.module';
import { CertificateModule } from './api/certificates/certificate.module';
import { AnalyticsModule } from './api/analytics/analytics.module';
import { AdminModule } from './api/admin/admin.module';
import { MediaModule } from './api/media/media.module';
import { UploadModule } from './api/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'database.sqlite',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    CoursesModule,
    ChaptersModule,
    ProgressModule,
    ApplicationsModule,
    ReviewsModule,
    QuizzesModule,
    AssignmentsModule,
    EnrollmentModule,       
    CertificateModule,   
    AnalyticsModule, 
    AdminModule,
    MediaModule,
    UploadModule,
    DatabaseModule,        
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    // Run database seeding on application startup
    await this.seederService.seed();
  }
}
