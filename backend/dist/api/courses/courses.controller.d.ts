import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../users/entities/user.entity';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(): Promise<import("./entites/course.entity").Course[]>;
    findOne(id: string): Promise<import("./entites/course.entity").Course>;
    create(dto: CreateCourseDto, user: User): Promise<import("./entites/course.entity").Course>;
    update(id: string, dto: CreateCourseDto, user: User): Promise<import("./entites/course.entity").Course>;
    publish(id: string, user: User): Promise<import("./entites/course.entity").Course>;
}
