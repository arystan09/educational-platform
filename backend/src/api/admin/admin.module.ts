import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
