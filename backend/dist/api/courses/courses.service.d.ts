import { Repository } from 'typeorm';
import { Course } from './entites/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from '../users/entities/user.entity';
export declare class CoursesService {
    private readonly courseRepository;
    constructor(courseRepository: Repository<Course>);
    findAll(): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    create(dto: CreateCourseDto, creator: User): Promise<Course>;
    update(id: string, dto: UpdateCourseDto, user: User): Promise<Course>;
    delete(id: string, user: User): Promise<void>;
    publish(id: string, user: User): Promise<Course>;
}
