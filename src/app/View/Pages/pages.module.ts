import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PagesRoutes } from './pages.routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes),
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [],
})
export class PagesModule {}