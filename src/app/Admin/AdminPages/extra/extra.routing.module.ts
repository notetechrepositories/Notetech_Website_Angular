import { Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const AdminExtraRoutes: Routes = [
    {
        path: 'contact-us', // ✅ Directly under `/admin`
        component: ContactUsComponent,
    },
];


