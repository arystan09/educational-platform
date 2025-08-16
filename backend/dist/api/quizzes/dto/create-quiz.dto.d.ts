declare class QuizOptionDto {
    text: string;
    isCorrect: boolean;
}
declare class QuizQuestionDto {
    question: string;
    type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
    options: QuizOptionDto[];
}
export declare class CreateQuizDto {
    title: string;
    description: string;
    courseId: string;
    questions: QuizQuestionDto[];
}
export {};
