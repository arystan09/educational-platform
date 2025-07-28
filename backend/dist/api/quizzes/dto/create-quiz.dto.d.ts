declare class QuizOptionDto {
    text: string;
    isCorrect: boolean;
}
declare class QuizQuestionDto {
    question: string;
    options: QuizOptionDto[];
}
export declare class CreateQuizDto {
    title: string;
    courseId: string;
    questions: QuizQuestionDto[];
}
export {};
