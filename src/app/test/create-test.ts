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

    modules1 = {
        toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
    };

    content1 = `<h2>1. MaxSoft is a software company. (20px)</h2>
            <br />
            <p>
              - (X) True
            </p>
            <p>
              - () False
            </p>
            <br />
            <h2>2. The domain of MaxSoft is test automation framework development. (10px)</h2>
            <p>
              - (X) True
            </p>
            <p>
              - () False
            </p>
            <br />
            <h2>3. What are the test automation frameworks developped by MaxSoft. (15px)</h2>
            <p>
              - [X] IntelliAPI
            </p>
            <p>
              - [] WebBot
            </p>
            <p>
              - [] Gauge
            </p>
            <p>
              - [] Selenium
            </p>`;


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
