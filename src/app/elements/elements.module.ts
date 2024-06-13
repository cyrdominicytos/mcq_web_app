import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// highlightjs
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// headlessui
import { MenuModule } from 'headlessui-angular';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { AlertsComponent } from './alerts';
import { AvatarComponent } from './avatar';
import { BadgesComponent } from './badges';
import { BreadcrumbsComponent } from './breadcrumbs';
import { ButtonsComponent } from './buttons';
import { ButtonsGroupComponent } from './buttons-group';
import { ColorLibraryComponent } from './color-library';
import { DropdownComponent } from './dropdown';
import { InfoboxComponent } from './infobox';
import { JumbotronComponent } from './jumbotron';
import { LoaderComponent } from './loader';
import { PaginationComponent } from './pagination';
import { PopoversComponent } from './popovers';
import { ProgressBarComponent } from './progress-bar';
import { SearchComponent } from './search';
import { TooltipsComponent } from './tooltips';
import { TreeviewComponent } from './treeview';
import { TypographyComponent } from './typography';

const routes: Routes = [
    { path: 'elements/alerts', component: AlertsComponent, title: 'Alerts | MCQ App' },
    { path: 'elements/avatar', component: AvatarComponent, title: 'Avatar | MCQ App' },
    { path: 'elements/badges', component: BadgesComponent, title: 'Badges | MCQ App' },
    { path: 'elements/breadcrumbs', component: BreadcrumbsComponent, title: 'Breadcrumbs | MCQ App' },
    { path: 'elements/buttons', component: ButtonsComponent, title: 'Buttons | MCQ App' },
    { path: 'elements/buttons-group', component: ButtonsGroupComponent, title: 'Buttons Group | MCQ App' },
    { path: 'elements/color-library', component: ColorLibraryComponent, title: 'Color Library | MCQ App' },
    { path: 'elements/dropdown', component: DropdownComponent, title: 'Dropdown | MCQ App' },
    { path: 'elements/infobox', component: InfoboxComponent, title: 'Infobox | MCQ App' },
    { path: 'elements/jumbotron', component: JumbotronComponent, title: 'Jumbotron | MCQ App' },
    { path: 'elements/loader', component: LoaderComponent, title: 'Loader | MCQ App' },
    { path: 'elements/pagination', component: PaginationComponent, title: 'Pagination | MCQ App' },
    { path: 'elements/popovers', component: PopoversComponent, title: 'Popovers | MCQ App' },
    { path: 'elements/progress-bar', component: ProgressBarComponent, title: 'Progress Bar | MCQ App' },
    { path: 'elements/search', component: SearchComponent, title: 'Search | MCQ App' },
    { path: 'elements/tooltips', component: TooltipsComponent, title: 'Tooltips | MCQ App' },
    { path: 'elements/treeview', component: TreeviewComponent, title: 'Treeview | MCQ App' },
    { path: 'elements/typography', component: TypographyComponent, title: 'Typography | MCQ App' },
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, NgxTippyModule, MenuModule, IconModule],
    declarations: [
        AlertsComponent,
        AvatarComponent,
        BadgesComponent,
        BreadcrumbsComponent,
        ButtonsComponent,
        ButtonsGroupComponent,
        ColorLibraryComponent,
        DropdownComponent,
        InfoboxComponent,
        JumbotronComponent,
        LoaderComponent,
        PaginationComponent,
        PopoversComponent,
        ProgressBarComponent,
        SearchComponent,
        TooltipsComponent,
        TreeviewComponent,
        TypographyComponent,
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
export class ElementsModule {}
