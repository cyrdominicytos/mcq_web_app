import {AnswerStudent} from "./answerStudent.model";
import {QuestionComment} from "./questionComment.model";
import {AnswerComment} from "./answerComment.model";

export interface AnswerQcm {
    studentId: number;
    answers: AnswerStudent[];
    questionsComments: QuestionComment[];
    answersComments: AnswerComment[];
}
