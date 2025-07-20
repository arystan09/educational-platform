import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { Certificate } from '../certificates/entities/certificate.entity';
import { QuizResult } from '../quizzes/entities/quiz-result.entity';
import { AssignmentSubmission } from '../assignments/entites/assignment-submission.entity';
import { DateRangeDto } from './dto/date-range.dto';
import { SubmissionStatus } from '../assignments/entites/assignment-submission.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    @InjectRepository(Enrollment)
    private enrollRepo: Repository<Enrollment>,
    @InjectRepository(Certificate)
    private certRepo: Repository<Certificate>,
    @InjectRepository(QuizResult)
    private quizResultRepo: Repository<QuizResult>,
    @InjectRepository(AssignmentSubmission)
    private submissionRepo: Repository<AssignmentSubmission>,
  ) {}

  async getUserStats({ from, to }: DateRangeDto) {
    return {
      totalUsers: await this.userRepo.count(),
      newUsers: await this.userRepo.count({
        where: { createdAt: Between(new Date(from), new Date(to)) },
      }),
    };
  }

  async getCourseStats({ from, to }: DateRangeDto) {
    const totalEnrollments = await this.enrollRepo.count();
    const popularCourses = await this.enrollRepo
      .createQueryBuilder('enrollment')
      .select('enrollment.courseId', 'courseId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('enrollment.courseId')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    const completedCourses = await this.enrollRepo.count({
      where: { completed: true },
    });

    return {
      totalEnrollments,
      topCourses: popularCourses,
      completedCourses,
    };
  }

  async getQuizStats({ from, to }: DateRangeDto) {
    const results = await this.quizResultRepo.find({
      where: { createdAt: Between(new Date(from), new Date(to)) },
    });

    const averageScore =
      results.reduce((sum, res) => sum + res.score, 0) / results.length || 0;

    return {
      totalQuizzes: results.length,
      averageScore: +averageScore.toFixed(2),
    };
  }

  async getCertificateStats({ from, to }: DateRangeDto) {
    const results = await this.certRepo
      .createQueryBuilder('certificate')
      .select('certificate.courseId', 'courseId')
      .addSelect('COUNT(*)', 'count')
      .where('certificate.issuedAt BETWEEN :from AND :to', { from, to })
      .groupBy('certificate.courseId')
      .getRawMany();

    return results;
  }

  async getAssignmentStats({ from, to }: DateRangeDto) {
    const submissions = await this.submissionRepo.find({
      where: { submittedAt: Between(new Date(from), new Date(to)) },
    });

    const total = submissions.length;
    const reviewed = submissions.filter((s) => s.status === SubmissionStatus.REVIEWED).length;
    const pending = submissions.filter((s) => s.status === SubmissionStatus.PENDING).length;

    return {
      totalSubmissions: total,
      reviewed,
      pending,
    };
  }
}
