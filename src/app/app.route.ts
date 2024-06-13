import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AnalyticsComponent } from './analytics';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';

// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';
import {TeacherModule} from "./test/teacher.module";
import {StudentModule} from "./test-student/student.module";

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            { path: '', component: IndexComponent, title: 'Sales Admin | MCQ App' },
            { path: 'analytics', component: AnalyticsComponent, title: 'Analytics Admin | MCQ App' },
            { path: 'finance', component: FinanceComponent, title: 'Finance Admin | MCQ App' },
            { path: 'crypto', component: CryptoComponent, title: 'Crypto Admin | MCQ App' },

            //apps
            { path: '', loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },

            // widgets
            { path: 'widgets', component: WidgetsComponent, title: 'Widgets | MCQ App' },

            // components
            { path: '', loadChildren: () => import('./components/components.module').then((d) => d.ComponentsModule) },

            // elements
            { path: '', loadChildren: () => import('./elements/elements.module').then((d) => d.ElementsModule) },

            // forms
            { path: '', loadChildren: () => import('./forms/form.module').then((d) => d.FormModule) },

            // users
            { path: '', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },

            // tables
            { path: 'tables', component: TablesComponent, title: 'Tables | MCQ App' },
            { path: '', loadChildren: () => import('./datatables/datatables.module').then((d) => d.DatatablesModule) },

            // test
            { path: '', loadChildren: () => import('./test/teacher.module').then((d) => d.TeacherModule) },

            // test student
            { path: '', loadChildren: () => import('./test-student/student.module').then((d) => d.StudentModule) },

            // font-icons
            { path: 'font-icons', component: FontIconsComponent, title: 'Font Icons | MCQ App' },

            // charts
            { path: 'charts', component: ChartsComponent, title: 'Charts | MCQ App' },

            // dragndrop
            { path: 'dragndrop', component: DragndropComponent, title: 'Dragndrop | MCQ App' },

            // pages
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, title: 'Knowledge Base | MCQ App' },
            { path: 'pages/faq', component: FaqComponent, title: 'FAQ | MCQ App' },
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            // pages
            { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },

            // auth
            { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },
];
