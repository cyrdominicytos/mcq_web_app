import { Answer } from './answer.model';

interface AnswerStatDTO {
    answerId: string|number;
    percent: string|number;
}

export default interface AnswerStat {
    answer: Answer;
    answerDTO: AnswerStatDTO;
}
