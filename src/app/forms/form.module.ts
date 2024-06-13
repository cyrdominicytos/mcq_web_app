import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// highlightjs
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

// touchspin
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';

// select
import { NgSelectModule } from '@ng-select/ng-select';

// quill editor
import { QuillModule } from 'ngx-quill';

// easymde
import { EasymdeModule } from 'ngx-easymde';

// input mask
import { TextMaskModule } from 'angular2-text-mask';

// nouilsider
import { NouisliderModule } from 'ng2-nouislider';

// flatpicker
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

// headlessui
import { MenuModule } from 'headlessui-angular';

// clipboard
import { ClipboardModule } from 'ngx-clipboard';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { BasicComponent } from './basic';
import { InputGroupComponent } from './input-group';
import { LayoutsComponent } from './layouts';
import { ValidationComponent } from './validation';
import { InputMaskComponent } from './input-mask';
import { Select2Component } from './select2';
import { TouchspinComponent } from './touchspin';
import { CheckboxRadioComponent } from './checkbox-radio';
import { SwitchesComponent } from './switches';
import { WizardsComponent } from './wizards';
import { FileUploadComponent } from './file-upload';
import { QuillEditorComponent } from './quill-editor';
import { MarkdownEditorComponent } from './markdown-editor';
import { DatePickerComponent } from './date-picker';
import { ClipboardComponent } from './clipboard';

const routes: Routes = [
    { path: 'forms/basic', component: BasicComponent, title: 'Forms | MCQ App' },
    { path: 'forms/input-group', component: InputGroupComponent, title: 'Input Group | MCQ App' },
    { path: 'forms/layouts', component: LayoutsComponent, title: 'Form Layouts | MCQ App' },
    { path: 'forms/validation', component: ValidationComponent, title: 'Form Validation | MCQ App' },
    { path: 'forms/input-mask', component: InputMaskComponent, title: 'Input Mask | MCQ App' },
    { path: 'forms/select2', component: Select2Component, title: 'Select2 | MCQ App' },
    { path: 'forms/touchspin', component: TouchspinComponent, title: 'Touchspin | MCQ App' },
    { path: 'forms/checkbox-radio', component: CheckboxRadioComponent, title: 'Checkbox & Radio | MCQ App' },
    { path: 'forms/switches', component: SwitchesComponent, title: 'Switches | MCQ App' },
    { path: 'forms/wizards', component: WizardsComponent, title: 'Wizards | MCQ App' },
    { path: 'forms/file-upload', component: FileUploadComponent, title: 'File Upload | MCQ App' },
    { path: 'forms/quill-editor', component: QuillEditorComponent, title: 'Quill Editor | MCQ App' },
    { path: 'forms/markdown-editor', component: MarkdownEditorComponent, title: 'Markdown Editor | MCQ App' },
    { path: 'forms/date-picker', component: DatePickerComponent, title: 'Date & Range Picker | MCQ App' },
    { path: 'forms/clipboard', component: ClipboardComponent, title: 'Clipboard | MCQ App' },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule,
        NgxNumberSpinnerModule,
        NgSelectModule,
        QuillModule.forRoot(),
        EasymdeModule.forRoot(),
        TextMaskModule,
        NouisliderModule,
        Ng2FlatpickrModule,
        MenuModule,
        ClipboardModule,
        IconModule,
    ],
    declarations: [
        BasicComponent,
        InputGroupComponent,
        LayoutsComponent,
        ValidationComponent,
        InputMaskComponent,
        Select2Component,
        TouchspinComponent,
        CheckboxRadioComponent,
        SwitchesComponent,
        WizardsComponent,
        FileUploadComponent,
        QuillEditorComponent,
        MarkdownEditorComponent,
        DatePickerComponent,
        ClipboardComponent,
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: {
                    json: () => import('highlight.js/lib/languages/json'),
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    xml: () => import('highlight.js/lib/languages/xml'),
                },
            },
        },
    ],
})
export class FormModule {}
