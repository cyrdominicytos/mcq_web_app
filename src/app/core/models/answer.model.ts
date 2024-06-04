export interface Answer {
    id: number;
    title: string;
    active: boolean;
    valid: boolean;
    questionId: number;
    nbrPoint: number;
    creationDate: string;
    updatedDate: string;
}
