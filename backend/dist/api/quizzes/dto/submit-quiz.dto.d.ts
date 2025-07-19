export declare class SubmitQuizDto {
    quizId: number;
    answers: {
        questionId: number;
        selectedOptionId: number;
    }[];
}
