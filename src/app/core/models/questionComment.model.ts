export interface QuestionComment {
    questionId: number;
    suggestion: string;
    description: string | null;
    accepted: boolean;
}
