import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Chapter } from '../../chapters/chapter.entity';

@Entity()
@Unique(['user', 'chapter'])
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Chapter)
  chapter: Chapter;

  @CreateDateColumn()
  completedAt: Date;
}
