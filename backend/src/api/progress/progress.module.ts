import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { Progress } from './entities/progress.entity';
import { Chapter } from '../chapters/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progress, Chapter])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
