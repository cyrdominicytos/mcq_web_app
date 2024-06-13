import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { ContactUsBoxedComponent } from './contact-us-boxed';
import { ContactUsCoverComponent } from './contact-us-cover';
import { ComingSoonBoxedComponent } from './coming-soon-boxed';
import { ComingSoonCoverComponent } from './coming-soon-cover';
import { Error404Component } from './error404';
import { Error500Component } from './error500';
import { Error503Component } from './error503';
import { MaintenenceComponent } from './maintenence';

// headlessui
import { MenuModule } from 'headlessui-angular';

const routes: Routes = [
    { path: 'pages/contact-us-boxed', component: ContactUsBoxedComponent, title: 'Contact Us Boxed | MCQ App' },
    { path: 'pages/contact-us-cover', component: ContactUsCoverComponent, title: 'Contact Us Cover | MCQ App' },
    { path: 'pages/coming-soon-boxed', component: ComingSoonBoxedComponent, title: 'Coming Soon Boxed | MCQ App' },
    { path: 'pages/coming-soon-cover', component: ComingSoonCoverComponent, title: 'Coming Soon Cover | MCQ App' },
    { path: 'pages/error404', component: Error404Component, title: 'Error 404 | MCQ App' },
    { path: 'pages/error500', component: Error500Component, title: 'Error 500 | MCQ App' },
    { path: 'pages/error503', component: Error503Component, title: 'Error 503 | MCQ App' },
    { path: 'pages/maintenence', component: MaintenenceComponent, title: 'Maintenence | MCQ App' },
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, MenuModule, IconModule],
    declarations: [
        ContactUsBoxedComponent,
        ContactUsCoverComponent,
        ComingSoonBoxedComponent,
        ComingSoonCoverComponent,
        Error404Component,
        Error500Component,
        Error503Component,
        MaintenenceComponent,
    ],
})
export class PagesModule {}
