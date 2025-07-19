import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Контроллеры и сервисы
import { AppController } from './app.controller';
import { AppService } from './app.service';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
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

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
