import UnAnswerQuestionModel from './unAnswerQuestion.model';

export default interface Stat {
    minScore?: number;
    highScore?: number;
    averageScore: number;
    unAnswerQuestion: UnAnswerQuestionModel[];
}
