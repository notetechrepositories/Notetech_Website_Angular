import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatNativeDateModule, MAT_DATE_FORMATS } from "@angular/material/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../material.module";

import { AppDashboardComponent } from "./dashboard/dashboard.component";
import { AdminPagesRoutes } from "./adminpages.routing.module";




export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




@NgModule({

  imports: [
    ReactiveFormsModule,
    MatNativeDateModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(AdminPagesRoutes),
  ],
  exports: [],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    DatePipe
  ],
  declarations: []
})
export class AdminPagesModule { }
