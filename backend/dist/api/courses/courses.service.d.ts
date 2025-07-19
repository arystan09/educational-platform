import { Repository } from 'typeorm';
import { Course } from './entites/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../users/entities/user.entity';
export declare class CoursesService {
    private courseRepo;
    constructor(courseRepo: Repository<Course>);
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    create(dto: CreateCourseDto, creator: User): Promise<Course>;
    update(id: number, dto: CreateCourseDto, user: User): Promise<Course>;
}
