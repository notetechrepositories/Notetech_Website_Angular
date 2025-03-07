import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { AdminExtraRoutes } from "./extra.routing.module";
import { ContactComponent } from "../../../View/Pages/contact/contact.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { MaterialModule } from "../../../material.module";
import { ViewContactComponent } from "./contact-us/view-contact/view-contact.component";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(AdminExtraRoutes),
        MatDialogModule,
        MaterialModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        ContactUsComponent,
        ViewContactComponent
    ],
})
export class AdminExtraModule { }
