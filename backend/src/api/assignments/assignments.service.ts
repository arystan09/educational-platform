import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entites/assignment.entity';
import { AssignmentSubmission } from './entites/assignment-submission.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { GradeAssignmentDto } from './dto/grade-assignment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { SubmissionStatus } from './entites/assignment-submission.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,

    @InjectRepository(AssignmentSubmission)
    private submissionRepo: Repository<AssignmentSubmission>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async createAssignment(dto: CreateAssignmentDto): Promise<Assignment> {
    const course = await this.courseRepo.findOne({
      where: { id: Number(dto.courseId) },
    });

    if (!course) throw new NotFoundException('Курс не найден');

    const assignment = this.assignmentRepo.create({
      title: dto.title,
      description: dto.description,
      dueDate: new Date(dto.dueDate),
      course,
    });

    return this.assignmentRepo.save(assignment);
  }

  async submitAssignment(dto: SubmitAssignmentDto, student: User): Promise<AssignmentSubmission> {
    const assignment = await this.assignmentRepo.findOne({
      where: { id: dto.assignmentId },
    });

    if (!assignment) throw new NotFoundException('Задание не найдено');

    const submission = this.submissionRepo.create({
      assignment,
      student,
      textAnswer: dto.textAnswer ?? undefined,
      ...(dto.fileUrl ? { fileUrl: dto.fileUrl } : {}),
    });

    return this.submissionRepo.save(submission);
  }

  async gradeSubmission(dto: GradeAssignmentDto): Promise<AssignmentSubmission> {
    const submission = await this.submissionRepo.findOne({
      where: { id: dto.submissionId },
      relations: ['assignment', 'student'],
    });

    if (!submission) throw new NotFoundException('Отправка не найдена');

    submission.grade = dto.grade;
    submission.feedback = dto.feedback ?? undefined;
    submission.status = SubmissionStatus.GRADED;

    return this.submissionRepo.save(submission);
  }

  async updateStatus(dto: UpdateStatusDto): Promise<AssignmentSubmission> {
    const submission = await this.submissionRepo.findOneBy({ id: dto.submissionId });
    if (!submission) throw new NotFoundException('Отправка не найдена');

    submission.status = dto.status;
    return this.submissionRepo.save(submission);
  }

  async getAssignmentsForCourse(courseId: string): Promise<Assignment[]> {
    return this.assignmentRepo.find({
      where: { course: { id: Number(courseId) } },
      relations: ['submissions'],
    });
  }

  async getSubmissionsForAssignment(assignmentId: string): Promise<AssignmentSubmission[]> {
    return this.submissionRepo.find({
      where: { assignment: { id: assignmentId } },
      relations: ['student'],
    });
  }

  async getMySubmissions(student: User): Promise<AssignmentSubmission[]> {
    return this.submissionRepo.find({
      where: { student: { id: student.id } },
      relations: ['assignment'],
    });
  }
}
