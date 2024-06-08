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

import { ListTestComponent } from './list-test';
import { StatMacroComponent } from './statistiques-macro';
import {CalendarComponent} from "../apps/calendar";
import {CreateTestComponent} from "./create-test";
import {HighlightModule} from "ngx-highlightjs";
import {Ng2FlatpickrModule} from "ng2-flatpickr";
import {NgSelectModule} from "@ng-select/ng-select";
import {QuillEditorComponent} from "ngx-quill";
import {ModalModule} from "angular-custom-modal";
import {StatisticsComponent} from "./statistics";
import { TakeTestComponent } from "./take-test";

const routes: Routes = [
    { path: 'list-test', component: ListTestComponent, title: 'List Test | MCQ App - List Test'},
    { path: 'create-test', component: CreateTestComponent, title: 'Create Test | MCQ App - Create Test' },
    { path: 'take-test', component: TakeTestComponent, title: 'Take Test | MCQ App - Take Test' },
    { path: 'statistics/qcm/:id', component: StatisticsComponent, title: 'Statistics Test | MCQ App - Statistics Test' },
    { path: 'statistques-macro', component: StatMacroComponent, title: 'Statistics | MCQ App - Statistics' },
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
        ListTestComponent,
        CreateTestComponent,
        StatisticsComponent,
        TakeTestComponent,
        StatMacroComponent,
    ],
    providers: [],
})
export class TestModule {}
