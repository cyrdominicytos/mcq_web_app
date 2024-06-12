import {Level} from "./level.model";
import {Question} from "./question.model";

export interface Qcm {
    id: number;
    details: string;
    level: Level | null;
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
    canShowResultToStudents: boolean;
}

export interface QcmToEdit {
    id: number;
    levelId: number;
    limitQuestion: number;
    active: boolean;
    delay: number;
    teacherId: number;
    title: string;
    details: string;
    complexity: number;
    randomActive: boolean;
    canShowResultToStudents: boolean;
    openStartDate: string;
    closeStartDate: string;
    creationDate: string;
    updatedDate: string;
    testCount: number;
    questionCount: number;
    content: string;
}
