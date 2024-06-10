import {Component, ViewChild, OnDestroy} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import {ModalComponent} from "angular-custom-modal";
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

interface Question {
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
    questions: Question[] = [
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

    currentQuestionIndex: number = 0;
    showResults: boolean = false;

    get currentQuestion(): Question {
        return this.questions[this.currentQuestionIndex];
    }

    nextQuestion(): void {
      //  this.currentTime2 = Date.now();
       // this.timeSpentPerQuestion[this.currentQuestionIndex] = (this.currentTime2 - this.currentTime1) / 1000;

       /* if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }*/
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
           // const delay = this.currentQuestion.delayInSeconds ?? 0;
           // this.currentTime1 = Date.now();
           // this.startTimer(delay);
        } else if (this.currentQuestionIndex === this.questions.length - 1) {
           // this.calculateResults();
            this.showResults = true;
        }
    }


    previousQuestion(): void {
       /* if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }*/
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            /*const delay = this.currentQuestion.delayInSeconds ?? 0;
            this.currentTime1 = Date.now();
            this.startTimer(delay);*/
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

}
