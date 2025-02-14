import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PagesRoutes } from './pages.routing.module';

import { CountUpModule } from 'ngx-countup';
import { ServiceComponent } from './service/service.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes),
    CountUpModule
  ],
  declarations: [
    HomeComponent,
    ServiceComponent
  ],
  exports: [],
})
export class PagesModule {}