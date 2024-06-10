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

import { ListQcmTeacherComponent } from './list-qcm-teacher';
import { StatMacroComponent } from './statistiques-macro';
import {CalendarComponent} from "../apps/calendar";
import {CreateQcmComponent} from "./create-qcm";
import {HighlightModule} from "ngx-highlightjs";
import {Ng2FlatpickrModule} from "ng2-flatpickr";
import {NgSelectModule} from "@ng-select/ng-select";
import {QuillEditorComponent} from "ngx-quill";
import {ModalModule} from "angular-custom-modal";
import {StatisticsComponent} from "./statistics";
import { ListTestStudentComponent } from '../test-student/list-test-student';
import { TakeTestComponent } from '../test-student/take-test';

const routes: Routes = [
    { path: 'list-test', component: ListTestStudentComponent, title: 'List Test | MCQ App - List Test'},
    { path: 'create-qcm', component: CreateQcmComponent, title: 'Create Qcm Teacher | MCQ App - Create Qcm Teacher' },
    { path: 'statistics', component: StatisticsComponent, title: 'Statistics Test Teacher | MCQ App - Statistics Test Teacher' },
    { path: 'statistques-macro', component: StatMacroComponent, title: 'Statistics Teacher | MCQ App - Statistics Teacher' },
    { path: 'take-test', component: TakeTestComponent, title: 'Take Test | MCQ App - Take Test' },
    { path: 'statistics/qcm/:id', component: StatisticsComponent, title: 'Statistics Test | MCQ App - Statistics Test' },
    { path: 'list-qcm-teacher', component: ListQcmTeacherComponent, title: 'List Qcm Teacher | MCQ App - List Qcm Teacher'}
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
        ModalModule,
    ],
    declarations: [
        ListQcmTeacherComponent,
        CreateQcmComponent,
        StatisticsComponent,
        StatMacroComponent,
    ],
    providers: [],
})
export class TeacherModule {}
