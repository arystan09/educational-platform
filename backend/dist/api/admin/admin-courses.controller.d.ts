import { CoursesService } from '../courses/courses.service';
import { CreateCourseDto } from '../courses/dto/create-course.dto';
import { UpdateCourseDto } from '../courses/dto/update-course.dto';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
export declare class AdminCoursesController {
    private readonly courseService;
    constructor(courseService: CoursesService);
    create(dto: CreateCourseDto, req: RequestWithUser): Promise<import("../courses/entites/course.entity").Course>;
    findAll(): Promise<import("../courses/entites/course.entity").Course[]>;
    update(id: string, dto: UpdateCourseDto, req: RequestWithUser): Promise<import("../courses/entites/course.entity").Course>;
    delete(id: string, req: RequestWithUser): Promise<void>;
    publish(id: string, req: RequestWithUser): Promise<import("../courses/entites/course.entity").Course>;
}
