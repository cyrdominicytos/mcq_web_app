import { Question } from './question.model';
import AnswerStat from './answerStat.model';
import UnAnswerQuestionModel from './unAnswerQuestion.model';

export default interface QuestionStat {
    question: Question;
    answerStats: AnswerStat[];
    unAnswerQuestionDTO: UnAnswerQuestionModel
}
