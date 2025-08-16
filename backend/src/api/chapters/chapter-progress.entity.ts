import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Chapter } from './chapter.entity';
import { User } from '../users/entities/user.entity';

@Entity()
export class ChapterProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chapter, { onDelete: 'CASCADE' })
  chapter: Chapter;

  @Column()
  chapterId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'datetime', nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 