import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { AdminExtraRoutes } from "./extra.routing.module";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(AdminExtraRoutes),
        MatDialogModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
    ],
    declarations: [

    ],
})
export class AdminExtraModule { }
