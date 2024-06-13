import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// highlightjs
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

// modal
import { ModalModule } from 'angular-custom-modal';

// counter
import { CountUpModule } from 'ngx-countup';

// lightbox
import { LightboxModule } from 'ngx-lightbox';

// headlessui
import { MenuModule } from 'headlessui-angular';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { TabsComponent } from './tabs';
import { AccordionsComponent } from './accordions';
import { ModalsComponent } from './modals';
import { CardsComponent } from './cards';
import { CarouselComponent } from './carousel';
import { CountdownComponent } from './countdown';
import { CounterComponent } from './counter';
import { SweetalertComponent } from './sweetalert';
import { TimelineComponent } from './timeline';
import { NotificationsComponent } from './notifications';
import { MediaObjectComponent } from './media-object';
import { ListGroupComponent } from './list-group';
import { PricingTableComponent } from './pricing-table';
import { LightboxComponent } from './lightbox';

const routes: Routes = [
    { path: 'components/tabs', component: TabsComponent, title: 'Tabs | MCQ App' },
    { path: 'components/accordions', component: AccordionsComponent, title: 'Accordions | MCQ App' },
    { path: 'components/modals', component: ModalsComponent, title: 'Modals | MCQ App' },
    { path: 'components/cards', component: CardsComponent, title: 'Cards | MCQ App' },
    { path: 'components/carousel', component: CarouselComponent, title: 'Carousel | MCQ App' },
    { path: 'components/countdown', component: CountdownComponent, title: 'Countdown | MCQ App' },
    { path: 'components/counter', component: CounterComponent, title: 'Counter | MCQ App' },
    { path: 'components/sweetalert', component: SweetalertComponent, title: 'Sweetalert | MCQ App' },
    { path: 'components/timeline', component: TimelineComponent, title: 'Timeline | MCQ App' },
    { path: 'components/notifications', component: NotificationsComponent, title: 'Notifications | MCQ App' },
    { path: 'components/media-object', component: MediaObjectComponent, title: 'Media Object | MCQ App' },
    { path: 'components/list-group', component: ListGroupComponent, title: 'List Group | MCQ App' },
    { path: 'components/pricing-table', component: PricingTableComponent, title: 'Pricing Table | MCQ App' },
    { path: 'components/lightbox', component: LightboxComponent, title: 'Lightbox | MCQ App' },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule,
        ModalModule,
        CountUpModule,
        LightboxModule,
        MenuModule,
        IconModule,
    ],
    declarations: [
        TabsComponent,
        AccordionsComponent,
        ModalsComponent,
        CardsComponent,
        CarouselComponent,
        CountdownComponent,
        CounterComponent,
        SweetalertComponent,
        TimelineComponent,
        NotificationsComponent,
        MediaObjectComponent,
        ListGroupComponent,
        PricingTableComponent,
        LightboxComponent,
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
export class ComponentsModule {}
