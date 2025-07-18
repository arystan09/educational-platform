import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../users/user.entity';
export declare class CoursesService {
    private courseRepo;
    constructor(courseRepo: Repository<Course>);
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    create(dto: CreateCourseDto, creator: User): Promise<Course>;
    update(id: number, dto: CreateCourseDto, user: User): Promise<Course>;
}
