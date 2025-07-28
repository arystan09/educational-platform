import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { IsNull } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createOrUpdate(userId: string, courseId: string, dto: Partial<Review>) {
    const course = await this.courseRepo.findOneBy({ id: courseId });
    if (!course) throw new NotFoundException('Курс не найден');

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Пользователь не найден');

    let review = await this.reviewRepo.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (review) {
      Object.assign(review, dto);
    } else {
      review = this.reviewRepo.create({
        ...dto,
        user,
        course,
      });
    }

    return await this.reviewRepo.save(review);
  }

  async findByCourse(courseId: string) {
    return this.reviewRepo.find({
      where: { course: { id: courseId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAverageRating(courseId: string) {
    const { avg } = await this.reviewRepo
      .createQueryBuilder('r')
      .select('AVG(r.rating)', 'avg')
      .where('r.courseId = :courseId', { courseId })
      .getRawOne();

    return Math.round(parseFloat(avg || '0') * 10) / 10;
  }

  async delete(userId: string, courseId: string) {
    const review = await this.reviewRepo.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (!review) throw new NotFoundException('Отзыв не найден');
    return this.reviewRepo.remove(review);
  }

  async findPending() {
    return this.reviewRepo.find({
      where: { isApproved: IsNull() },
      relations: ['user', 'course'],
      order: { createdAt: 'DESC' },
    });
  }

  async approve(id: string) {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Отзыв не найден');

    if (review.isApproved === true)
      throw new BadRequestException('Отзыв уже одобрен');

    review.isApproved = true;
    return this.reviewRepo.save(review);
  }

  async reject(id: string) {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Отзыв не найден');

    if (review.isApproved === false)
      throw new BadRequestException('Отзыв уже отклонён');

    review.isApproved = false;
    return this.reviewRepo.save(review);
  }
}
