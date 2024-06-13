import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import {authConfig} from '../../environments/environment';
import { Backup } from '../core/models/backup.model';
import { BackupService } from '../core/services/backup.service';
import { AuthStatusService } from '../core/services/auth.service';


@Component({
    moduleId: module.id,
    templateUrl: './create-qcm.html',
})
export class CreateQcmComponent implements OnInit, AfterViewInit, OnDestroy{
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
    errorMessage: string = "";
    successMessage: string = "";
    successMessage2: string = "";
    errorMessage2: string = "";
    lineNumbers: number[] = [1];
    private intervalId: any;

    teacherId: number = authConfig.teacherId;
    limitQuestion = 0;
    delay = 0;
    //extra field of QCM
    details: String = "";
    isActive: boolean = true;
    isRandomActive: boolean = false;
    canShowResultToStudents: boolean = true;
    questions: String = "";
    lastBackup: String = "";

    //edit variables
    editQcm: QcmToEdit = {
        id: 0,
        levelId: 0,
        limitQuestion: 0,
        active: true,
        delay: 0,
        teacherId: 0,
        title: "",
        details: "",
        complexity: 0,
        randomActive: false,
        canShowResultToStudents: false,
        openStartDate: "",
        closeStartDate: "",
        creationDate: "",
        updatedDate: "",
        testCount: 0,
        questionCount: 0,
        content: ""
    };
    testId: number = 0;
    @ViewChild('questions', { static: false }) textarea: ElementRef | undefined;
    constructor(public storeData: Store<any>, public fb: FormBuilder, private levelService: LevelService, private  globalService: GlobalService, private testService: TestService, private backupService: BackupService, private  router: Router, private authService: AuthStatusService) {
        if(this.authService.isStudent){
            this.router.navigate(['/list-qcm-student']);
        }
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
        this.startInterval();
    }
    ngAfterViewInit() {
        if(this.testId != 0)
            this.updateLineNumbers(this.editQcm?.content);
    }
    initForm() {
        this.formCreateTest = this.fb.group({
            testName: [this.editQcm.title ? this.editQcm.title : '', Validators.required],
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
        this.resertErrors()
        if(this.isFormValid()){
            if(this.testId===0)
            {
                this.createTest();
            }else
            {
                this.updateTest();
            }
        }
    }

    resertErrors(){
        this.errorMessage = ""
        this.errorMessage2 = ""
        this.successMessage = ""
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
        const data = this.formatToSave()
        if(this.file!=null){
            this.testService.createTestWithFile(data).subscribe(response => {
                this.showMessage('Test was created successfully.');
                //this.successMessage = "Test was created successfully."
                this.router.navigate(['/list-qcm-teacher'], { state: { mode: 1 } });
                console.log("currente_error", response)
            }, error => {
                this.errorMessage = error.error
                this.errorMessage2 = error.error
                console.error('QCM creation failed', error);
            });
        }

    }

    updateTest(){
        console.log("In update")
        const data = this.formatToSave()
        if(this.file!=null){
            console.log("Data sent ", data.get("details"))
            this.testService.updateTestWithFile(data, this.testId).subscribe(response => {
                this.showMessage('Test was updated successfully.');
                //this.successMessage = "Test was updated successfully."
                this.router.navigate(['/list-qcm-teacher'], { state: { mode: 2 } });
            }, error => {
                //this.showMessage('QCM creation failed :'+error, "error");
                this.validationError = error
                this.errorMessage2 = error.error
                this.errorMessage = error.error
                console.error('QCM update failed', error);
            });
        }

    }

    isFormValid(){
        const formValues = this.formCreateTest.value;
        formValues.testName = formValues.testName ? formValues.testName : this.editQcm.title
        formValues.module = formValues.module ? formValues.module : this.editQcm.levelId
        if(!formValues.testName)
        {
            this.errorMessage = "Veuillez renseigner le champs : Nom du test "
            return false;
        }

        if(!formValues.module)
        {
            this.errorMessage = "Veuillez renseigner le champs : Classe - Filère"
            return false;
        }
        return  true;
    }

    setOldValuesInForm(){
        if(this.editQcm.id>0){

            this.formCreateTest.controls['testName'].markAsTouched();
            this.formCreateTest.controls['testName'].markAsDirty();

            this.formCreateTest.patchValue({
                module: this.editQcm.levelId  // Mettre à jour la valeur du contrôle de sélection
            });
            this.formCreateTest.controls['module'].markAsTouched();
            this.formCreateTest.controls['module'].markAsDirty();

            this.formCreateTest.patchValue({
                complexity: this.editQcm.complexity  // Mettre à jour la valeur du contrôle de sélection
            });
            console.log("currentlevel", this.editQcm.complexity)
            this.formCreateTest.controls['complexity'].markAsTouched();
            this.formCreateTest.controls['complexity'].markAsDirty();

            this.formCreateTest.patchValue({
                details: this.editQcm.details  // Mettre à jour la valeur du contrôle de sélection
            });
            this.formCreateTest.controls['details'].markAsTouched();
            this.formCreateTest.controls['details'].markAsDirty();

            this.formCreateTest.patchValue({
                canShowResultToStudents: this.editQcm.canShowResultToStudents  // Mettre à jour la valeur du contrôle de sélection
            });
            this.formCreateTest.controls['canShowResultToStudents'].markAsTouched();
            this.formCreateTest.controls['canShowResultToStudents'].markAsDirty();

            this.isRandomActive = this.editQcm.randomActive
        }
    }
    formatToSave(){
        this.saveFile()
        const formValues = this.formCreateTest.value;
        const formData = this.testService.formatObject(
            this.file as File,
            formValues.module ? formValues.module : this.editQcm.levelId,
            this.teacherId,
            this.limitQuestion,
            this.delay,
            formValues.testName ? formValues.testName : this.editQcm.title,
            formValues.details ? formValues.details : this.editQcm.details,
            formValues.complexity ? formValues.complexity : this.editQcm.complexity,
            this.isRandomActive ,
            this.canShowResultToStudents,
            this.editQcm.active,
            '2022-07-05T00:00:00',
            '2022-07-05T00:00:00'
        );

        return formData;

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
        if(!this.questions)
            this.questions = this.editQcm.content
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

                this.setOldValuesInForm()
            },
            (error) => {
                this.errorMessage = "Error while loading the MCQ ! Vérify your internet connection or contact the system admin."
                console.error('Error while loading editQcm:', error);
            }
        );
    }

    closeErrorAlert(i:number){
        if (i == 1)
            this.errorMessage = ""
        else
            this.errorMessage2 = ""
    }
    closeSussessAlert(i: number){
        if (i == 1)
            this.successMessage = ""
        else
            this.successMessage2 = ""
    }

    updateLineNumbers(content: String) {
        const lineCount = content.split('\n').length;
        this.lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);
    }
    syncScroll() {
        const textarea = this.textarea!.nativeElement;
        const lineNumbers = document.querySelector('.line-numbers') as HTMLElement;
        if (lineNumbers) {
            lineNumbers.scrollTop = textarea.scrollTop;
        }
    }


    //Full screen mamagment
    toggleFullscreen() {
        const textarea = this.textarea!.nativeElement;
        if (!document.fullscreenElement) {
            if (textarea.requestFullscreen) {
                textarea.requestFullscreen();
            } else if (textarea.mozRequestFullScreen) { // Firefox
                textarea.mozRequestFullScreen();
            } else if (textarea.webkitRequestFullscreen) { // Chrome, Safari and Opera
                textarea.webkitRequestFullscreen();
            } else if (textarea.msRequestFullscreen) { // IE/Edge
                textarea.msRequestFullscreen();
            }
            textarea.classList.add('fullscreen');
            document.addEventListener('keydown', this.exitFullscreenOnEscape.bind(this));
        } else {
            this.exitFullscreen();
        }
    }

    exitFullscreenOnEscape(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.exitFullscreen();
        }
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) { // Firefox
            (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari and Opera
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) { // IE/Edge
            (document as any).msExitFullscreen();
        }
        const textarea = this.textarea!.nativeElement;
        textarea.classList.remove('fullscreen');
        document.removeEventListener('keydown', this.exitFullscreenOnEscape.bind(this));
    }

    //Backup management
    getBackup(){
        this.backupService.getTeacherBackup(this.teacherId).subscribe(
            (backup) => {
                if(backup){
                    //this.questions = backup.content
                    this.editQcm.content = backup.content
                    this.updateLineNumbers(this.editQcm.content);
                    console.log("Backup restore", backup)
                    this.successMessage2 = "Données restaurées !"
                }else this.successMessage2 = "Aucune données à restaurer !"

            },
            (error) => {
                this.errorMessage = "Error while loading the MCQ ! Vérify your internet connection or contact the system admin."
                console.error('Error while loading backup:', error);
            }
        );
    }
    saveBackup(){
        let text = this.questions ? this.questions : this.editQcm.content;
        if(text && text!= this.lastBackup){
            this.backupService.saveBackup(this.teacherId, text.toString()).subscribe(response => {
                this.successMessage2 = "Données sauvegardées !"
                this.lastBackup = text.toString()
            }, error => {
                console.error('Backup error', error);
            });
        }else   console.log("Backup", "Nothing to save !")
    }

    //execution periodique pour savegarder
    ngOnDestroy(): void {
        this.clearInterval();
    }

    startInterval(): void {
        const intervalTime = 10000; // Intervalle en millisecondes (10000 ms = 10 secondes)
        this.intervalId = setInterval(() => {
            this.saveBackup();
        }, intervalTime);
    }

    clearInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

}
