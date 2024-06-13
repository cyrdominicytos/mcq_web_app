import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from "angular-custom-modal";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import {TestService} from "../core/services/test.service";
import {Qcm} from "../core/models/qcm.model";
import { Router } from '@angular/router';
import { AuthStatusService } from '../core/services/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: './list-qcm-teacher.html',
})
export class ListQcmTeacherComponent {

    @ViewChild('isDeleteModal') isDeleteModal!: ModalComponent;
    selectedQcmId: any = null;
    //isTypeSelected: boolean = false;
    isVisibleImportPanel: boolean = false;
    constructor(public fb: FormBuilder, private testService: TestService, private router: Router, private  authService: AuthStatusService) {
        if(this.authService.isStudent){
            this.router.navigate(['/list-qcm-student']);
        }
    }

    search = '';

    cols = [
        { field: 'id', title: 'ID', isUnique: true, filter: false },
        { field: 'title', title: 'Quiz' },
        { field: 'module', title: 'Module' },
        { field: 'totalQuestions', title: '# Questions', filter: false  },
        { field: 'status', title: 'Status' , filter: false},
        { field: 'openStartDate', title: 'Lancé le', type: 'date' },
        { field: 'closeStartDate', title: 'Date déchéance', type: 'date' },
        { field: 'actions', title: 'Action', filter: false, headerClass: 'justify-center' },
    ];

    ngOnInit() {
        this.loadTests();
    }

    listOfTests: Qcm[] = [];
    //listOfTests: any = [];
    loadTests() {
        console.log('Calling loadTests()...');
        this.testService.getAllTests().subscribe(
            (tests) => {
                this.listOfTests = tests;
                console.log(this.listOfTests);
            },
            (error) => {
                console.error('Error while loading tests:', error);
            }
        );
    }

    exportQcm(id: number) {
        this.testService.exportQcmAsJson(id).subscribe(
            response => {
                this.downloadFile(response, `qcm_${id}.json`);
                console.log('QCM Exported Successfully', response);
                this.showMessage('Export has been completed successfully.');
            },
            error => {
                console.error('Error exporting QCM', error);
            }
        );
    }

    private downloadFile(data: Blob, filename: string) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    deleteRows() {
        this.deleteQcm(this.selectedQcmId);
        this.isDeleteModal.close();
    }

    deleteQcm(id: number) {
        this.testService.deleteQcm(id).subscribe(
            () => {
                this.listOfTests = this.listOfTests.filter((d: any) => d.id != id);
                this.showMessage('QCM with ID ' + id + ' deleted successfully.');
                console.log(`QCM with ID ${id} deleted successfully.`);
            },
            error => {
                console.error('Error deleting QCM', error);
            }
        );
    }

    exporter(){
        this.showMessage('Export has been completed successfully.');
    }

    getTotalQuestions(qcm: Qcm): number {
        return qcm.questions.length;
    }
    getStatus(qcm: Qcm): string {
        if (!qcm.active) {
            return 'Inactive';
        }

        const now = new Date();
        const openStartDate = new Date(qcm.openStartDate);
        const closeStartDate = new Date(qcm.closeStartDate);

        if(!closeStartDate){
            if (now >= openStartDate && now <= closeStartDate) {
                return 'En cours';
            } else {
                return 'Clôturé';
            }
        }else{
            if (now >= openStartDate) {
                return 'En cours';
            } else {
                return 'Clôturé';
            }
        }
    }

    params!: FormGroup;
    initForm() {
        this.params = this.fb.group({
            type: [false],
            module: ['',Validators.required],
            field: ['',Validators.required],
            qcm: [''],
        });
    }
    openImportPanel() {
        this.isVisibleImportPanel = true;
        this.initForm();
        this.initAllLists();
    }

    // Extract listOfClasses and listOfFields
    listOfClasses = new Set<string>();
    listOfFields = new Set<string>();
    listOfClassesArray : any =  [];
    listOfFieldsArray : any =  [];
    initAllLists() {
        this.listOfTests.forEach(qcm => {
            if (qcm.level) {
                this.listOfClasses.add(qcm.level.classOfStudy);
                this.listOfFields.add(qcm.level.fieldOfStudy);
            }
            this.listOfClassesArray = Array.from(this.listOfClasses);
            this.listOfFieldsArray = Array.from(this.listOfFields);
        });
        console.log('List of Classes:', this.listOfClassesArray);
        console.log('List of Fields:', this.listOfFieldsArray);
    }

    closeImportPanel() {
        this.isVisibleImportPanel = false;
    }

    import() {
        if (this.params.controls['module'].errors) {
            this.showMessage('Module is required.', 'error');
            return;
        }
        if (this.params.controls['field'].errors) {
            this.showMessage('Field is required.', 'error');
            return;
        }
        const jsonFile = this.uploadedFile;
        if (!jsonFile) {
            this.showMessage('File is required.', 'error');
            return;
        }

        if (this.params.get('type')?.value) {
            // Modif
        } else {
            // New
            this.testService.createQcmViaJson(jsonFile, 3, 1).subscribe(
                (response: Qcm) => {
                    //respomse to QCM ? No, better to return QCM in the backend
                    this.listOfTests.unshift(response);
                    this.listOfTests = [...this.listOfTests];
                    console.log('New list....');
                    console.log(this.listOfTests);
                    this.showMessage('Import has been completed successfully.');
                    console.log('QCM created successfully:', response);
                },
                error => {
                    console.error('Error creating QCM:', error);
                }
            );
        }

        /*if (this.params.value.id) {
            //update task
            let note: any = this.notesList.find((d: { id: any }) => d.id === this.params.value.id);
            note.title = this.params.value.title;
            note.user = this.params.value.user;
            note.description = this.params.value.description;
            note.tag = this.params.value.tag;
        } else {
            //add note
            let maxNoteId = this.notesList.length
                ? this.notesList.reduce((max: number, character: { id: number }) => (character.id > max ? character.id : max), this.notesList[0].id)
                : 0;
            let dt = new Date();
            let note = {
                id: maxNoteId + 1,
                title: this.params.value.title,
                user: this.params.value.user,
                thumb: 'profile-21.jpeg',
                description: this.params.value.description,
                date: dt.getDate() + '/' + Number(dt.getMonth()) + 1 + '/' + dt.getFullYear(),
                isFav: false,
                tag: this.params.value.tag,
            };
            this.notesList.splice(0, 0, note);
            this.searchNotes();
        }*/

        //this.showMessage('Import has been completed successfully.');
        this.isVisibleImportPanel = false;
        //this.isAddNoteModal.close();
        //this.searchNotes();
    }

    uploadedFile: any = null;

    onFileSelected() {
        const fileInput = document.getElementById('jsonFile') as HTMLInputElement;
        const files: FileList | null = fileInput.files;
        if (files && files.length > 0) {
            this.uploadedFile = files[0];
            //const uploadedFile = files[0];
            //console.log('Uploaded file:', uploadedFile);
            // Do whatever you need with the file here
        }
    }

    deleteConfirmModal(id: any = null) {
        this.selectedQcmId = id;
        setTimeout(() => {
            this.isDeleteModal.open();
        }, 10);
    }


    formatDate(date: any) {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
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


    modifyTest(testId: number) {
        console.log("Sending id ", testId);
        this.router.navigate(['/create-qcm'], { state: { id: testId } });
    }
}
