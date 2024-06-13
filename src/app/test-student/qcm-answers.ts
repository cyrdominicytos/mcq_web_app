import {Component, ViewChild, OnDestroy} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import {ModalComponent} from "angular-custom-modal";
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { QcmDto, StudentTestAnswer } from '../core/models/studentTest.model';
import { LevelService } from '../core/services/level.service';
import { GlobalService } from '../core/services/gobal.service';
import { TestService } from '../core/services/test.service';
import { BackupService } from '../core/services/backup.service';
import { Router } from '@angular/router';
import { StudentTestAnswersService } from '../core/services/stduentTestAnswers.service';
import { Question } from '../core/models/question.model';
import { Qcm } from '../core/models/qcm.model';
import { QcmService } from '../service/qcm.service';
import { Answer } from '../core/models/answer.model';

interface QuestionFake {
    question: string;
    options: string[];
    correctAnswers: string[];
    givenAnswers: string[];
}
@Component({
    moduleId: module.id,
    templateUrl: './qcm-answers.html',
})
export class QcmAnswersComponent {

    @ViewChild('isAddCommentModal') isAddCommentModal!: ModalComponent;
    params = {
        comment: '',
    };
    score = 100;

    questions: QuestionFake[] = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswers: ['Paris'],
            givenAnswers: ['Paris']
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            correctAnswers: ['Mars'],
            givenAnswers :['Earth']
        },
        {
            question: 'What is the largest ocean on Earth?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            correctAnswers: ['Pacific Ocean'],
            givenAnswers: ['Arctic Ocean']
        },
        {
            question: 'Which of the following are plays by William Shakespeare?',
            options: ['Hamlet', 'Pride and Prejudice', 'Romeo and Juliet', 'Oliver Twist'],
            correctAnswers: ['Hamlet', 'Romeo and Juliet'],
            givenAnswers:['Hamlet']
        }
    ];


    showResults: boolean = true;

    //New dev
    testId: number = 1;
    studentAnswers: StudentTestAnswer[] = [];
    qcm: QcmDto | undefined ;
    studentAnswer: StudentTestAnswer | undefined ;
    currentQcm: Qcm | undefined;
    currentsQuestion: Question | undefined;
    currentQuestionIndex: number = 0;

    constructor(public storeData: Store<any>, private  globalService: GlobalService, private studentTestAnswersService: StudentTestAnswersService, private testService: TestService, private  router: Router) {
        //get StudentTestId
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            this.testId = navigation.extras.state['id'];
            console.log("Go data", this.testId)
        }else {
            console.log("No studentTestId sent", navigation?.extras.state)
            this.router.navigate(['/list-test']); // Redirige vers la page spécifique
        }

        this.getTestAnswers();
    }
    get currentQuestion(): QuestionFake {
        return this.questions[this.currentQuestionIndex];
    }

    nextQuestion(): void {
        if(this.currentQcm?.questions!=undefined){
            if (this.currentQuestionIndex < this.currentQcm?.questions?.length - 1) {
                this.showResults = false;
                console.log('nextQuestion0',this.currentQuestionIndex )
                this.currentQuestionIndex++;
                this.currentsQuestion = this.currentQcm?.questions[this.currentQuestionIndex];
            }else {
                console.log('nextQuestion1',this.currentQuestionIndex )
               this.restartNavigation();
            }

        }else{
            this.restartNavigation();
        }

    }

    restartNavigation(){
        this.showResults = true;
        this.currentQuestionIndex = -1
    }

    previousQuestion(): void {
            if (this.currentQuestionIndex > 0) {
                console.log('previousQuestion0',this.currentQuestionIndex )
                this.showResults = false;
                this.currentQuestionIndex--;
                this.currentsQuestion = this.currentQcm?.questions[this.currentQuestionIndex];
            }else {
                console.log('previousQuestion1',this.currentQuestionIndex )
               this.restartNavigation();
            }

    }

    getOptionStyles(option: string): { [key: string]: string } {
        const isGivenAnswer = this.currentQuestion.givenAnswers.includes(option);
        const isCorrectAnswer = this.currentQuestion.correctAnswers.includes(option);

        if (isGivenAnswer && isCorrectAnswer) {
            // Green for correct given answers
            return {
                'background-color': '#d4edda',
                'border-color': '#c3e6cb',
                'color': '#155724'
            };
        } else if (isGivenAnswer || isCorrectAnswer) {
            // Red for incorrect given answers and correct answers not given
            return {
                'background-color': '#f8d7da',
                'border-color': '#f5c6cb',
                'color': '#721c24'
            };
        } else {
            // No styling for options not in either list
            return {};
        }
    }


    //Current dev : Don't removed
    getTestAnswers() {
        this.studentTestAnswersService.getStudentTestAnswers(this.testId).subscribe(
            (tests) => {
                this.studentAnswers = tests;
                if(this.studentAnswers.length > 0)
                    this.studentAnswer = this.studentAnswers[0];
                console.log("load",this.studentAnswers )
                this.loadQcmById(this.studentAnswer?.studentTest?.qcm?.id);
            },
            (error) => {
                console.error('Error while loading studentAnswers:', error);
            });
    }

    loadQcmById(qcmId: number| undefined) {
        if(qcmId !=undefined){
            this.testService.getById(qcmId).subscribe(
                (tests) => {
                    this.currentQcm = tests;
                    //if(this.currentQcm.questions.length > 0)
                        //this.currentsQuestion = this.currentQcm.questions[0];
                    this.previousQuestion();
                },
                (error) => {
                    console.error('Error while loading QCM:', error);
                });
        }

    }

    filterdQuestionStudentAnswers(q: Question){
        return this.studentAnswers.filter(value => {
           return  value.answer.questionId == q.id
        })
    }
    isSelectedByStudent(a: Answer){
        //get all answers for this questions provide by student
        const temp =  this.studentAnswers.filter(value => {
           return  value.answer.questionId == a.questionId
        })
        return  temp.some(value => value.answer.id === a.id);
    }
    getAnswerStyles(a: Answer): { [key: string]: string } {
        const selected = this.isSelectedByStudent(a);
        if(selected){
            //reponse cochée
            return this.getStyles(a.valid ? 1 : 3);
        }else{
            //réponse non cochée
            return this.getStyles(a.valid ? 2 : 4);
        }
    }



    getStyles(num: number) : { [key: string]: string }{
        if(num==1){
            //bonne réponse cochée
            // Green for correct given answers
            return {
                //'background-color': '#155724',
                'border': '3px solid blue',
                //'color': '#d4edda'
                'background-color': '#d4edda',
                'color': '#155724'
            };
        }else if(num==2){
            // bonne réponse non coché
            return {
                //'background-color': '#155724',
                'background-color': '#d4edda',
                'color': '#155724'
                //'color': '#d4edda'
            };
        }else if(num==3){
            // mauvaise réponse cochée
            return {
                //'background-color': '#B20000',
                //'background-color': '#CE5D5D',
                'background-color': '#f8d7da',
                'border': '3px solid blue',
                //'color': '#d4edda'
                'color': '#721c24'
            };
        }else if(num==4){
            // mauvaise réponse cochée
            return {
                //'background-color': '#B20000',
                //'background-color': '#CE5D5D',
                'background-color': '#f8d7da',
                //'color': '#d4edda'
                'color': '#721c24'
            };
        }else{
            return {};
        }
    }
}
