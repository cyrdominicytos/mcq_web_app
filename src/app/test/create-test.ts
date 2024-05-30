import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {FlatpickrOptions} from "ng2-flatpickr";
import { Store } from '@ngrx/store';

@Component({
    moduleId: module.id,
    templateUrl: './create-test.html',
})
export class CreateTestComponent {

    //options = ['Orange', 'White', 'Purple'];
    //input1 = 'Orange';
    //options2 = ['Orange', 'White', 'Purple'];
    //input2 = 'Orange';

    //form1!: FormGroup;

    search = '';
    basic: FlatpickrOptions;

    formCreateTest!: FormGroup;
    isSubmitForm = false;

    constructor(public storeData: Store<any>, public fb: FormBuilder) {
        this.initStore();
        /*this.form1 = this.fb.group({

        });*/
        this.initForm();
        this.basic = {
            defaultDate: '2024-06-01',
            dateFormat: 'Y-m-d',
            position: this.store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
        };
    }

    initForm() {
        this.formCreateTest = this.fb.group({
            testName: ['', Validators.required],
            module: ['', Validators.required],
            //userName: ['', Validators.required],
            moduleClass: ['', Validators.required],
            //state: ['', Validators.required],
            //zip: ['', Validators.required],
            //isTerms: [false, Validators.requiredTrue],
            date1: ['2022-07-05',Validators.required],
            date2: ['2022-07-05',Validators.required],
        });
    }

    submitForm() {
        this.isSubmitForm = true;
        if (this.formCreateTest.valid) {
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


    createTest(){
        this.showMessage('Test was created successfully.');
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
