import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';


export const AdminPagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },

  },

];
