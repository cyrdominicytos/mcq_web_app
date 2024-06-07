import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {FlatpickrOptions} from "ng2-flatpickr";
import { Store } from '@ngrx/store';
import { Level } from '../core/models/level.model';
import { LevelService } from '../core/services/level.service';
import { Observable } from 'rxjs';
import { GlobalService } from '../core/services/gobal.service';
import { TestService } from '../core/services/test.service';
import { Qcm, QcmToEdit } from '../core/models/qcm.model';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './create-qcm.html',
})
export class CreateQcmComponent implements OnInit{

    //options = ['Orange', 'White', 'Purple'];
    //input1 = 'Orange';
    //options2 = ['Orange', 'White', 'Purple'];
    //input2 = 'Orange';

    //form1!: FormGroup;
    levels$: Observable<Level[]>;
    complexities: number[] = [];
    file: File | null = null;
    search = '';
    basic: FlatpickrOptions;

    formCreateTest!: FormGroup;
    isSubmitForm = false;
    showHelp = false;
    validationError: string = "";

    teacherId: number = 3;
    limitQuestion = 0;
    delay = 0;
    //extra field of QCM
    details: String = "";
    isActive: boolean = true;
    isRandomActive: boolean = false;
    canShowResultToStudents: boolean = true;
    questions: String = "";

    //edit variables
    editQcm: QcmToEdit | null = null;
    testId: number = 0;
    constructor(public storeData: Store<any>, public fb: FormBuilder, private levelService: LevelService, private  globalService: GlobalService, private testService: TestService, private  router: Router) {
        this.initStore();
        //init for update QCM
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            this.testId = navigation.extras.state['id'];
            this.loadQcmToEdit(this.testId);
        }else console.log("in creation mode !", navigation?.extras.state)
        /*this.form1 = this.fb.group({

        });*/
        this.initForm();
        this.basic = {
            defaultDate: '2024-06-01',
            dateFormat: 'Y-m-d',
            position: this.store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
        };
        this.levels$ = this.levelService.getLevelsObservable();


    }

    ngOnInit(){
        this.levelService.getAllLevels();
        this.complexities = this.globalService.generateFibonacciSequence(20);
    }
    initForm() {
        this.formCreateTest = this.fb.group({
            testName: ['', Validators.required],
            module: ['', Validators.required],
            //userName: ['', Validators.required],
            complexity: ['0', Validators.required],
            //state: ['', Validators.required],
            details: ['', Validators.required],
            canShowResultToStudents: [false, Validators.required],
            date1: ['2022-07-05T00:00:00', Validators.required],
            date2: ['2022-07-05T00:00:00', Validators.required],
        });

    }

    submitForm() {
        if(this.testId===0)
        {
            this.createTest();
        }else
        {
            this.updateTest();
        }
       /*
       this.isSubmitForm = true;
       if (this.formCreateTest.valid) {
            //form validated success
            this.showMessage('Form submitted successfully.');
        }*/
    }

    store: any;
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }


    createTest(){
        this.saveFile()
        if(this.file!=null){
            const formValues = this.formCreateTest.value;
            this.testService.createTestWithFile(
                this.file,
                formValues.module,
                this.teacherId,
                this.limitQuestion,
                this.delay,
                formValues.testName,
                formValues.complexity,
                this.isRandomActive,
                this.isActive,
                '2022-07-05T00:00:00',
                '2022-07-05T00:00:00',
            ).subscribe(response => {
                this.showMessage('Test was created successfully.');
            }, error => {
                this.showMessage('QCM creation failed :'+error, "error");
                console.error('QCM creation failed', error);
            });
        }

    }

    updateTest(){
        console.log("In update")
        this.saveFile()
        if(this.file!=null){
            const formValues = this.formCreateTest.value;
            this.testService.updateTestWithFile(
                this.testId,
                this.file,
                formValues.module,
                this.teacherId,
                this.limitQuestion,
                this.delay,
                formValues.testName,
                formValues.complexity,
                this.isRandomActive,
                this.isActive,
                '2022-07-05T00:00:00',
                '2022-07-05T00:00:00',
            ).subscribe(response => {
                this.showMessage('Test was updated successfully.');
            }, error => {
                //this.showMessage('QCM creation failed :'+error, "error");
                this.validationError = error.message()
                console.error('QCM creation failed', error);
            });
        }

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

    saveFile() {
        console.log("questions", this.questions)
        const blob = new Blob([this.questions as BlobPart],{ type: 'text/plain;charset=utf-8' });
        this.file = new File([blob], "questionFiles.txt", { type: 'text/plain;charset=utf-8' });
        console.log("File", this.file)
    }

    loadQcmToEdit(qcmId: number) {
        console.log('Calling loadQcmToEdit()...', qcmId);
        this.testService.getTestToEdit(qcmId, this.teacherId).subscribe(
            (tests) => {
                this.editQcm = tests;
                console.log(this.editQcm);
            },
            (error) => {
                console.error('Error while loading editQcm:', error);
            }
        );
    }
}
