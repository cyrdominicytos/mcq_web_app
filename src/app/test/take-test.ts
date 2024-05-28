import {Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {FlatpickrOptions} from "ng2-flatpickr";
import { Store } from '@ngrx/store';
import {ModalComponent} from "angular-custom-modal";

@Component({
    moduleId: module.id,
    templateUrl: './take-test.html',
})
export class TakeTestComponent {

    @ViewChild('isAddCommentModal') isAddCommentModal!: ModalComponent;

    params = {
        id: null,
        title: '',
    };

    options = ['Orange', 'White', 'Purple'];
    input1 = 'Orange';
    options2 = ['Orange', 'White', 'Purple'];
    input2 = 'Orange';
    form1!: FormGroup;
    constructor(public storeData: Store<any>, public fb: FormBuilder) {
        this.initStore();
        this.form1 = this.fb.group({
            date1: ['2022-07-05'],
        });
        this.initForm();
        this.basic = {
            defaultDate: '2022-07-05',
            dateFormat: 'Y-m-d',
            position: this.store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
        };
    }
    search = '';
    basic: FlatpickrOptions;

    initForm() {
        this.form4 = this.fb.group({
            firstName: ['Shaun', Validators.required],
            lastName: ['Park', Validators.required],
            userName: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            isTerms: [false, Validators.requiredTrue],
        });
    }

    form4!: FormGroup;
    isSubmitForm4 = false;
    submitForm4() {
        this.isSubmitForm4 = true;
        if (this.form4.valid) {
            //form validated success
            this.showMessage('Form submitted successfully.');
        }
    }

    store: any;
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }



    addComment(project: any = null) {
        setTimeout(() => {
            this.params = {
                id: null,
                title: '',
            };
            if (project) {
                this.params = JSON.parse(JSON.stringify(project));
            }
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
