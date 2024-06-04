import {Answer} from "./answer.model";

export interface Question {
    id: number;
    title: string;
    active: boolean;
    delay: number;
    qcmId: number;
    complexity: number;
    answers: Answer[];
    creationDate: string;
    updatedDate: string;
}
