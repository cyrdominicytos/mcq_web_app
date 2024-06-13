import {Component, ViewChild, OnDestroy, ElementRef} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TestService } from '../core/services/test.service';
import {AnswerService} from "../core/services/answer.service";
import {Qcm} from "../core/models/qcm.model";
import {Question} from "../core/models/question.model";
import {Answer} from "../core/models/answer.model";
import {AnswerQcm} from "../core/models/answerQcm.model";
import {AnswerStudent} from "../core/models/answerStudent.model";

@Component({
    moduleId: module.id,
    templateUrl: './take-test.html',
})
export class TakeTestComponent implements OnDestroy{

    isVisibleSignalQuestionPanel: boolean = false;
    @ViewChild('commentTextarea') commentTextarea!: ElementRef;

    currentComment: string | null = null;

    questions: Question[] = [];
    questionsInitialValues: Question[] = [];

    //TODO implement from constants
    studentId: number = 1;

    currentQuestionIndex: number = -1; // Because we start with Instructions.
    userAnswers: string[][] | null = null;
    //userAnswers: string[][] = this.questions.map(() => []);
    showResults: boolean = false;
    lastQuestion: boolean = false;
    showInstructions: boolean = true;
    score: number = 0.0;
    timeLeft: number = 0;
    timerSubscription: Subscription | undefined;

    currentTime1: number = 0;
    currentTime2: number = 0;
    timeSpentPerQuestion: number[] = [];

    isEditingQuestion: boolean = false;

    currentQuestionOrPreviousWithDelay: boolean = false;

    toggleEditQuestion() {
        this.isEditingQuestion = !this.isEditingQuestion;
    }

    updateQuestion(event: Event) {
        const input = event.target as HTMLInputElement;
        this.currentQuestion.title = input.value;
    }

    updateOption(event: Event, index: number): void {
        const input = event.target as HTMLInputElement;
        this.currentQuestion.answers[index].title = input.value;
    }

    handleEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.toggleEditQuestion();
        }
    }

    get currentQuestion(): Question {
        return this.questions[this.currentQuestionIndex];
    }

    startTimer(seconds: number): void {
        this.timeLeft = seconds;
        this.timerSubscription = interval(1000)
            .pipe(
                takeWhile(() => this.timeLeft > 0)
            )
            .subscribe(() => {
                this.timeLeft--;
                if (this.timeLeft === 0) {
                    this.nextQuestion();
                }
            });
    }

    ngOnDestroy(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    checkDelayInQuestions() {
        if (this.currentQuestionIndex >= 1 ){
            if (this.questions[this.currentQuestionIndex].delay > 0 || this.questions[this.currentQuestionIndex - 1].delay > 0){
                this.currentQuestionOrPreviousWithDelay = true;
            }else {
                this.currentQuestionOrPreviousWithDelay = false;
            }
        }
    }

    nextQuestion(): void {
        // Save the comment
        if (this.currentQuestionIndex>=0 && this.currentQuestionIndex < this.questions.length) // Only calling when visualizing a question
        {
            this.saveComment();
        }

        this.currentTime2 = Date.now();
        this.timeSpentPerQuestion[this.currentQuestionIndex] = (this.currentTime2 - this.currentTime1) / 1000;

        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            const delay = this.currentQuestion.delay ?? 0;
            this.currentTime1 = Date.now();
            this.startTimer(delay);
            // For next button
            if (this.currentQuestionIndex === this.questions.length - 1) {
                this.lastQuestion = true;
            }
        } else if (this.currentQuestionIndex === this.questions.length - 1) {
            this.calculateResults();
            this.saveSuggestions();
            this.saveTimeSpent();
            this.showResults = true;
            this.sendAnswers();
            console.log(this.answerQcm);
        }
        this.isEditingQuestion = false;
        //this.isVisibleSignalQuestionPanel = false;
        //if something to show, make visible
        this.isVisibleSignalQuestionPanel = this.answerQcm.questionsComments[this.currentQuestionIndex].description !== null;

        //init current comment
        this.currentComment = this.answerQcm.questionsComments[this.currentQuestionIndex].description;

        this.checkDelayInQuestions();
    }


    previousQuestion(): void {
        // Save the comment
        if (this.currentQuestionIndex>=0 && this.currentQuestionIndex < this.questions.length) // Only calling when visualizing a question
        {
            this.saveComment();
        }

        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            const delay = this.currentQuestion.delay ?? 0;
            this.currentTime1 = Date.now();
            this.startTimer(delay);
        }
        this.isEditingQuestion = false;
        //if something to show, make visible
        this.isVisibleSignalQuestionPanel = this.answerQcm.questionsComments[this.currentQuestionIndex].description !== null;
        this.lastQuestion = false;
        //init current comment
        this.currentComment = this.answerQcm.questionsComments[this.currentQuestionIndex].description;
    }

    saveSuggestions() {
        this.questionsInitialValues.forEach((initialQuestion, index) => {
            // Suggestions of a Question
            let newQuestion : any = this.questions.find(q => q.id === initialQuestion.id);
            if (newQuestion.title !== initialQuestion.title){
                const questionComment = this.answerQcm.questionsComments.find(questionComment => questionComment.questionId === initialQuestion.id);
                if (questionComment) questionComment.suggestion = newQuestion.title;
            }
            // Suggestions of the Options in a Question
            const initialAnswers: Answer[] = initialQuestion.answers;
            for (const initialAnswer of initialAnswers) {
                let newAnswer: Answer = newQuestion.answers.find((a: Answer) => a.id === initialAnswer.id);
                if (newAnswer.title !== initialAnswer.title){
                    const answerComment = {
                        answerId: initialAnswer.id,
                        suggestion: newAnswer.title,
                        description: newAnswer.title,
                        accepted: true,
                    };
                    this.answerQcm.answersComments.push(answerComment);
                }
            }

        });
    }

    saveTimeSpent() {
        this.questions.forEach((question, index) => {
            const timeSpent = this.timeSpentPerQuestion[index] ?? 0;

            this.answerQcm.answers.forEach((answer) => {
                if (answer.questionId === question.id) {
                    answer.duration = timeSpent;
                }
            });
        });
    }

    /*selectAnswer(option: Answer): void {
        if (!this.userAnswers) {
            console.error('User answers are not initialized.');
            return;
        }

        const answers = this.userAnswers[this.currentQuestionIndex];
        const index = answers.indexOf(option.title);
        if (index > -1) {
            answers.splice(index, 1);
            this.removeAnswer(option);
        } else {
            answers.push(option.title);
            this.addAnswer(option);
        }
    }*/

    selectAnswer(option: Answer): void {
        if (!this.userAnswers) {
            console.error('User answers are not initialized.');
            return;
        }

        const answers = this.userAnswers[this.currentQuestionIndex];
        const index = answers.indexOf(option.title);
        if (index > -1) {
            answers.splice(index, 1);
            this.removeAnswer(option);
        } else {
            answers.push(option.title);
            this.addAnswer(option);
        }
    }

    addAnswer(option: Answer) {
        const currentAnswer: AnswerStudent = {
            questionId: this.questions[this.currentQuestionIndex].id,
            answerId: option.id,
            duration: 0
        };
        this.answerQcm.answers.push(currentAnswer);
    }

    removeAnswer(option: Answer) {
        this.answerQcm.answers = this.answerQcm.answers.filter(answer => answer.answerId !== option.id)
    }

    /*isSelected(option: string): boolean {
        if (!this.userAnswers) {
            return false;
        }
        return this.userAnswers[this.currentQuestionIndex].includes(option);
    }*/

    isSelected(optionId: number): boolean {
        if (!this.userAnswers) {
            return false;
        }
        return this.userAnswers[this.currentQuestionIndex].includes(optionId.toString());
    }

    initQuestionsComments(){
        this.questions.forEach((question, index) => {
            const comment = {
                questionId: question.id,
                suggestion: '',
                description: null,
                accepted: true,
            };
            this.answerQcm.questionsComments.push(comment);
        });
    }

    saveComment(): void {
        if (this.currentComment !== null) {
            this.answerQcm.questionsComments[this.currentQuestionIndex].description = this.currentComment;
        }
    }

    calculateResults(): void {
        console.log('Questionnaire Results:');
        this.questions.forEach((question, index) => {
            const timeSpent = this.timeSpentPerQuestion[index] ?? 0;
            console.log(`Question: ${question.title}`);
            //console.log(`Options Checked: ${this.userAnswers[index].join(', ')}`);
            if (this.userAnswers && this.userAnswers[index]) {
                console.log(`Options Checked: ${this.userAnswers[index].join(', ')}`);
            } else {
                console.log('User answers are not initialized or index is out of range.');
            }
            console.log(`Displayed Time: ${new Date(this.currentTime1).toLocaleTimeString()}`);
            console.log(`Answered Time: ${new Date(this.currentTime2).toLocaleTimeString()}`);
            console.log(`Time Spent: ${timeSpent} seconds`);
            console.log('---');
        });

        let correctAnswersCount = 0;
        /*this.questions.forEach((question, index) => {
            const userAnswerSet = new Set(this.userAnswers[index]);
            const correctAnswerSet = new Set(question.correctAnswers);
            if (userAnswerSet.size === correctAnswerSet.size && [...userAnswerSet].every(answer => correctAnswerSet.has(answer))) {
                correctAnswersCount++;
            }
        });*/
        //this.score = (correctAnswersCount / this.questions.length) * 100;
    }

    qcmId: number = 0;

    constructor(public storeData: Store<any>, public fb: FormBuilder, private  router: Router, private testService: TestService, private answerService: AnswerService) {
        this.initStore();
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            this.qcmId = navigation.extras.state['id'];
            //this.loadQcm(this.qcmId);
        }else console.log("Not comming from a legal place !", navigation?.extras.state)
    }

    ngOnInit() {
        this.loadQcm(this.qcmId);
    }

    currentQcm : Qcm = {
        id: 0,
        details: '',
        level: null,
        questions: [],
        limitQuestion: 0,
        active: false,
        delay: 0,
        teacherId: 0,
        title: '',
        complexity: 0,
        randomActive: false,
        openStartDate: '',
        closeStartDate: '',
        creationDate: '',
        updatedDate: '',
        canShowResultToStudents: false,
    }
    loadQcm(qcmId: number) {
        this.testService.getQcmById(qcmId).subscribe(
            (qcm) => {
                this.currentQcm = qcm;
                this.initializeQuestions(qcm);
                this.initializeUserAnswers(qcm);
                this.initQuestionsComments();
                console.log('qcm: ====> ');
                console.log(qcm);
            },
            (error) => {
                console.error('Error while loading Qcm:', error);
            }
        );
    }

    answerQcm : AnswerQcm = {
        studentId: 0,
        answers: [],
        questionsComments: [],
        answersComments: [],
    }

    sendAnswers(){
        this.answerQcm.studentId = this.studentId;
        this.answerService.answerQcm(this.currentQcm.id,this.answerQcm).subscribe(
            (score) => {
                this.score = parseFloat(((score.totalValidQuestion / score.totalQuestion) * 100).toFixed(2));
                this.showMessage('Answer of the QCM has been sent successfully.');
                console.log(score);
            },
            (error) => {
                console.error('Error while loading Qcm:', error);
            }
        );
    }

    initializeQuestions(qcm: any): void {
        // Filter questions to include only those with the active attribute set to true
        //this.questions = qcm.questions.filter((question: any) => question.active);
        this.questions = qcm.questions;
        this.questionsInitialValues = this.deepCopy(qcm.questions);
    }

    initializeUserAnswers(qcm: any): void {
        this.userAnswers = qcm.questions.map(() => []);
    }

     deepCopy<T>(obj: T): T {
         if (obj === null || typeof obj !== 'object') {
             return obj;
         }
         if (Array.isArray(obj)) {
             const copy: any[] = [];
             obj.forEach((_, i) => {
                 copy[i] = this.deepCopy(obj[i]);
             });
             return copy as any;
         }
         const copy: { [key: string]: any } = {};
         Object.keys(obj).forEach(key => {
             copy[key] = this.deepCopy((obj as { [key: string]: any })[key]); }); return copy as T;
     }

    search = '';

    store: any;
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    addComment() {
        this.isVisibleSignalQuestionPanel = true;

        if (this.answerQcm.questionsComments[this.currentQuestionIndex].description === null) {
            this.answerQcm.questionsComments[this.currentQuestionIndex].description = '';
        }
        this.currentComment = this.answerQcm.questionsComments[this.currentQuestionIndex].description;
    }

    startTest(){
        this.showInstructions = false;
        this.nextQuestion();
    }
    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }
}
