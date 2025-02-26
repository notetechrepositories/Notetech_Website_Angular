import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PagesRoutes } from './pages.routing.module';

import { CountUpModule } from 'ngx-countup';
import { ServiceComponent } from './service/service.component';
import { ComonPageComponent } from './comon-page/comon-page.component';
import { CommonPage2Component } from './common-page-2/common-page-2.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes),
    CountUpModule
  ],
  declarations: [
    HomeComponent,
    ServiceComponent,
    ComonPageComponent,
    CommonPage2Component,
    ContactComponent
  ],
  exports: [],
})
export class PagesModule { }