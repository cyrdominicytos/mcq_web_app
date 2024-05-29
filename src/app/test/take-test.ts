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
    delayInSeconds?: number;
}
@Component({
    moduleId: module.id,
    templateUrl: './take-test.html',
})
export class TakeTestComponent implements OnDestroy{

    @ViewChild('isAddCommentModal') isAddCommentModal!: ModalComponent;

    params = {
        comment: '',
    };

    questions: Question[] = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswers: ['Paris']
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            correctAnswers: ['Mars'],
            delayInSeconds: 10 // 10 seconds delay for this question
        },
        {
            question: 'What is the largest ocean on Earth?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            correctAnswers: ['Pacific Ocean'],
            delayInSeconds: 15 // 15 seconds delay for this question
        },
        {
            question: 'Which of the following are plays by William Shakespeare?',
            options: ['Hamlet', 'Pride and Prejudice', 'Romeo and Juliet', 'Oliver Twist'],
            correctAnswers: ['Hamlet', 'Romeo and Juliet']
        }
    ];

    currentQuestionIndex: number = 0;
    userAnswers: string[][] = this.questions.map(() => []);
    showResults: boolean = false;
    score: number = 0;
    timeLeft: number = 0;
    timerSubscription: Subscription | undefined;

    currentTime1: number = 0;
    currentTime2: number = 0;
    timeSpentPerQuestion: number[] = [];

    /*get currentQuestion(): Question {
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

    nextQuestion(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            const delay = this.currentQuestion.delayInSeconds ?? 0;
            this.startTimer(delay);
        } else if (this.currentQuestionIndex === this.questions.length - 1) {
            this.calculateResults();
            this.showResults = true;
        }
    }

    previousQuestion(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            const delay = this.currentQuestion.delayInSeconds ?? 0;
            this.startTimer(delay);
        }
    }

    selectAnswer(option: string): void {
        const answers = this.userAnswers[this.currentQuestionIndex];
        const index = answers.indexOf(option);
        if (index > -1) {
            answers.splice(index, 1);
        } else {
            answers.push(option);
        }
    }

    isSelected(option: string): boolean {
        return this.userAnswers[this.currentQuestionIndex].includes(option);
    }

    calculateResults(): void {
        let correctAnswersCount = 0;
        this.questions.forEach((question, index) => {
            const userAnswerSet = new Set(this.userAnswers[index]);
            const correctAnswerSet = new Set(question.correctAnswers);
            if (userAnswerSet.size === correctAnswerSet.size && [...userAnswerSet].every(answer => correctAnswerSet.has(answer))) {
                correctAnswersCount++;
            }
        });
        this.score = (correctAnswersCount / this.questions.length) * 100;
    }*/
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

    nextQuestion(): void {
        this.currentTime2 = Date.now();
        this.timeSpentPerQuestion[this.currentQuestionIndex] = (this.currentTime2 - this.currentTime1) / 1000;

        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            const delay = this.currentQuestion.delayInSeconds ?? 0;
            this.currentTime1 = Date.now();
            this.startTimer(delay);
        } else if (this.currentQuestionIndex === this.questions.length - 1) {
            this.calculateResults();
            this.showResults = true;
        }
    }


    previousQuestion(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            const delay = this.currentQuestion.delayInSeconds ?? 0;
            this.currentTime1 = Date.now();
            this.startTimer(delay);
        }
    }

    selectAnswer(option: string): void {
        const answers = this.userAnswers[this.currentQuestionIndex];
        const index = answers.indexOf(option);
        if (index > -1) {
            answers.splice(index, 1);
        } else {
            answers.push(option);
        }
    }

    isSelected(option: string): boolean {
        return this.userAnswers[this.currentQuestionIndex].includes(option);
    }

    calculateResults(): void {
        console.log('Questionnaire Results:');
        this.questions.forEach((question, index) => {
            const timeSpent = this.timeSpentPerQuestion[index] ?? 0;
            console.log(`Question: ${question.question}`);
            console.log(`Options Checked: ${this.userAnswers[index].join(', ')}`);
            console.log(`Displayed Time: ${new Date(this.currentTime1).toLocaleTimeString()}`);
            console.log(`Answered Time: ${new Date(this.currentTime2).toLocaleTimeString()}`);
            console.log(`Time Spent: ${timeSpent} seconds`);
            console.log('---');
        });

        let correctAnswersCount = 0;
        this.questions.forEach((question, index) => {
            const userAnswerSet = new Set(this.userAnswers[index]);
            const correctAnswerSet = new Set(question.correctAnswers);
            if (userAnswerSet.size === correctAnswerSet.size && [...userAnswerSet].every(answer => correctAnswerSet.has(answer))) {
                correctAnswersCount++;
            }
        });
        this.score = (correctAnswersCount / this.questions.length) * 100;
    }

    //options = ['Orange', 'White', 'Purple'];
    //input1 = 'Orange';
    //options2 = ['Orange', 'White', 'Purple'];
    //input2 = 'Orange';
    //form1!: FormGroup;

    constructor(public storeData: Store<any>, public fb: FormBuilder) {
        this.initStore();
        /*this.form1 = this.fb.group({
            date1: ['2022-07-05'],
        });
        this.initForm();
        this.basic = {
            defaultDate: '2022-07-05',
            dateFormat: 'Y-m-d',
            position: this.store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
        };*/
    }
    search = '';
    //basic: FlatpickrOptions;

    /*initForm() {
        this.form4 = this.fb.group({
            firstName: ['Shaun', Validators.required],
            lastName: ['Park', Validators.required],
            userName: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            isTerms: [false, Validators.requiredTrue],
        });
    }*/

    /*form4!: FormGroup;
    isSubmitForm4 = false;
    submitForm4() {
        this.isSubmitForm4 = true;
        if (this.form4.valid) {
            //form validated success
            this.showMessage('Form submitted successfully.');
        }
    }*/

    store: any;
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }



    addComment() {
        setTimeout(() => {
            this.params = {
                comment: '',
            };
            this.isAddCommentModal.open();
        });
    }

    saveComment() {
        /*if (!this.params.title) {
            this.showMessage('Title is required.', 'error');
            return;
        }*/

        /*if (this.params.id) {
            //update project
            const project = this.projectList.find((d: any) => d.id === this.params.id);
            project.title = this.params.title;
        } else {
            //add project
            const lastId = this.projectList.length
                ? this.projectList.reduce((max: number, obj: any) => (obj.id > max ? obj.id : max), this.projectList[0].id)
                : 0;

            const project = {
                id: lastId + 1,
                title: this.params.title,
                tasks: [],
            };
            this.projectList.push(project);
        }*/

        this.showMessage('Project has been saved successfully.');
        this.isAddCommentModal.close();
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
