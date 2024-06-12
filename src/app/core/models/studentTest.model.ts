import { Answer } from './answer.model';
import { Qcm } from './qcm.model';
import { Level } from './level.model';
import { Question } from './question.model';
import { Student } from './user.model';

export interface StudentTest {
    id: number;
    startingDate: string;
    endDate: string;
    creationDate: string;
    updatedDate: string;
    qcm: QcmDto;
    student : Student;

}

export interface QcmDto {
    id: number;
    limitQuestion: number;
    active: boolean;
    canShowResultToStudents: boolean;
    randomActive: boolean;
    delay: number;
    title: string;
    details: string;
    complexity: number;
    openStartDate: string;
    closeStartDate: string;
    creationDate: string;
    updatedDate: string;
}


export interface StudentTestAnswer {
    id: number;
    duration: number;
    creationDate: string;
    updatedDate: string;
    studentTest: StudentTest;
    answer: Answer;
}




