import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from "angular-custom-modal";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
    moduleId: module.id,
    templateUrl: './list-test.html',
})
export class ListTestComponent {

    //isTypeSelected: boolean = false;
    isVisibleImportPanel: boolean = false;
    constructor(public fb: FormBuilder) {}

    //@ViewChild('isAddNoteModal') isAddNoteModal!: ModalComponent;

    search = '';

    cols = [
        { field: 'id', title: 'ID', isUnique: true, filter: false },
        { field: 'quiz', title: 'Quiz' },
        { field: 'module', title: 'Module' },
        { field: 'status', title: 'Status' , filter: false},
        { field: 'start', title: 'Lancé le', type: 'date' },
        { field: 'end', title: 'Date déchéance', type: 'date' },
        { field: 'actions', title: 'Action', filter: false, headerClass: 'justify-center' },
    ];

    rows = [
        {
            id: 1,
            quiz: 'Bases des structures de données.',
            module: 'Intro aux structures des données',
            status: 'Clôturé',
            start: '2024-05-05',
            end: '2024-06-05'
        },
        {
            id: 2,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'En cours',
            start: '2024-06-07',
            end: '2024-06-07'
        },
        {
            id: 3,
            quiz: 'Fondements de la conception de bases de données',
            module: 'Introduction aux technologies web',
            status: 'Clôturé',
            start: '2024-05-05',
            end: '2024-07-07'
        },
        {
            id: 4,
            quiz: 'Concepts des systèmes dexplotation',
            module: 'Systèmes dexplotation',
            status: 'En cours',
            start: '2024-05-05',
            end: '2024-07-07'
        },
        {
            id: 5,
            quiz: 'Bases des structures de données',
            module: 'Intro aux structures des données',
            status: 'Clôturé',
            start: '2024-05-05',
            end: '2024-06-05'
        },
        {
            id: 6,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'En cours',
            start: '2024-06-07',
            end: '2024-06-07'
        },
        {
            id: 7,
            quiz: 'Fondements de la conception de bases de données',
            module: 'Introduction aux technologies web',
            status: 'Clôturé',
            start: '2024-05-05',
            end: '2024-07-07'
        },
        {
            id: 8,
            quiz: 'Concepts des systèmes dexplotation',
            module: 'Systèmes dexplotation',
            status: 'En cours',
            start: '2024-05-05',
            end: '2024-07-07'
        },
        {
            id: 9,
            quiz: 'Bases des structures de données',
            module: 'Intro aux structures des données',
            status: 'Clôturé',
            start: '2024-05-05',
            end: '2024-06-05'
        },
        {
            id: 10,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'En cours',
            start: '2024-06-07',
            end: '2024-06-07'
        },
        {
            id: 11,
            quiz: 'Fondements de la conception de bases de données',
            module: 'Introduction aux technologies web',
            status: 'Clôturé',
            start: '2024-05-05',
            end: '2024-07-07'
        },
        {
            id: 12,
            quiz: 'Concepts des systèmes dexplotation',
            module: 'Systèmes dexplotation',
            status: 'En cours',
            start: '2024-05-05',
            end: '2024-07-07'
        }
    ];

    params!: FormGroup;
    initForm() {
        this.params = this.fb.group({
            id: [0],
            title: ['', Validators.required],
            description: [''],
            tag: [''],
            user: [''],
            thumb: [''],
            type: [false],
        });
    }
    openImportPanel(note: any = null) {
        //this.isShowNoteMenu = false;
        //this.isAddNoteModal.open();
        this.isVisibleImportPanel = true;
        this.initForm();
        if (note) {
            this.params.setValue({
                id: note.id,
                title: note.title,
                description: note.description,
                tag: note.tag,
                user: note.user,
                thumb: note.thumb,
            });
        }
    }

    closeImportPanel() {
        this.isVisibleImportPanel = false;
    }

    importer() {
        /*if (this.params.controls['title'].errors) {
            this.showMessage('Title is required.', 'error');
            return;
        }*/
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

        this.showMessage('Import has been completed successfully.');
        this.isVisibleImportPanel = false;
        //this.isAddNoteModal.close();
        //this.searchNotes();
    }

    exporter(){
        this.showMessage('Export has been completed successfully.');
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
}
