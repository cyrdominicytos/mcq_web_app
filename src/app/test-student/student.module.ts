import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// datatable
import { DataTableModule } from '@bhplugin/ng-datatable';

// apexchart
import { NgApexchartsModule } from 'ng-apexcharts';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// headlessui
import { MenuModule } from 'headlessui-angular';

// jsontoexcel
import { AngJson2excelBtnModule } from 'ang-json2excel-btn';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';
import { ListQcmStudentComponent } from './list-qcm-student';

import { QcmAnswersComponent } from './qcm-answers';
import {CalendarComponent} from "../apps/calendar";
import {HighlightModule} from "ngx-highlightjs";
import {Ng2FlatpickrModule} from "ng2-flatpickr";
import {NgSelectModule} from "@ng-select/ng-select";
import {QuillEditorComponent} from "ngx-quill";
import {TakeTestComponent} from "./take-test";
import {ListTestStudentComponent} from "./list-test-student";

const routes: Routes = [
    { path: 'list-qcm-student', component: ListQcmStudentComponent, title: 'List Qcm Student| MCQ App - List Qcm Student' },
    { path: 'take-test', component: TakeTestComponent, title: 'Take Test Student | MCQ App - Take Test Student' },
    { path: 'list-test', component: ListTestStudentComponent, title: 'List Test Student | MCQ App - List Test Student' },
    { path: 'qcm-answers', component: QcmAnswersComponent, title: 'Qcm Answers Student| MCQ App - Qcm Answers Student' },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DataTableModule,
        NgApexchartsModule,
        NgxTippyModule,
        MenuModule,
        AngJson2excelBtnModule,
        IconModule,
        HighlightModule,
        Ng2FlatpickrModule,
        NgSelectModule,
        QuillEditorComponent,
    ],
    declarations: [
        ListQcmStudentComponent,
        TakeTestComponent,
        ListTestStudentComponent,
        QcmAnswersComponent,
    ],
    providers: [],
})
export class StudentModule {}
