import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Контроллеры и сервисы
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Модули
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ChaptersModule } from './chapters/chapters.module';

@Module({
  imports: [
    // Загружаем .env глобально
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Подключение к PostgreSQL через TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true, // на проде обязательно ставим false
      }),
      inject: [ConfigService],
    }),

    // Другие модули
    UsersModule,

    AuthModule,

    CoursesModule,

    ChaptersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
