import UnAnswerQuestionModel from './unAnswerQuestion.model';
import { Qcm } from './qcm.model';
import QcmStatModel from './qcmStat.model';
import QuestionStat from './questionStat.model';

export default interface Stat {
    qcm: Qcm;
    qcmStat: QcmStatModel;
    questionStats: QuestionStat[];
}
