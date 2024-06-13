import {Qcm} from "./qcm.model";
import {Student} from "./user.model";

export interface Score {
    id: number;
    qcm: Qcm;
    student: Student;
    totalValidQuestion: number;
    totalQuestion: number;
}
