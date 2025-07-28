export declare class SubmitQuizDto {
    quizId: string;
    answers: {
        questionId: string;
        selectedOptionId: string;
    }[];
}
