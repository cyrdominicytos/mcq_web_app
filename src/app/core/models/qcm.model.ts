import {Level} from "./level.model";
import {Question} from "./question.model";

export interface Qcm {
    id: number;
    level: Level;
    questions: Question[];
    limitQuestion: number;
    active: boolean;
    delay: number;
    teacherId: number;
    title: string;
    complexity: number;
    randomActive: boolean;
    openStartDate: string;
    closeStartDate: string;
    creationDate: string;
    updatedDate: string;
}

