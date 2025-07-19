import { Course } from '../../courses/entites/course.entity';
export declare class Assignment {
    id: string;
    title: string;
    description: string;
    course: Course;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
