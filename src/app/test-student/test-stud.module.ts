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
import { ListTestStudComponent } from './list-test-student';
import {CalendarComponent} from "../apps/calendar";
import {HighlightModule} from "ngx-highlightjs";
import {Ng2FlatpickrModule} from "ng2-flatpickr";
import {NgSelectModule} from "@ng-select/ng-select";
import {QuillEditorComponent} from "ngx-quill";

const routes: Routes = [
    { path: 'list-test-student', component: ListTestStudComponent, title: 'List Test Student| MCQ App - List Test Student' },
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
        ListTestStudComponent,
    ],
    providers: [],
})
export class TestStudModule {}
