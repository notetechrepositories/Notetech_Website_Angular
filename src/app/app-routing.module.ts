import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './View/Layout/full/full.component';
import { PagesModule } from './View/Pages/pages.module';
import { AdminFullComponent } from './Admin/Layout/admin-full/admin-full.component';
import { HomeComponent } from './View/Pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      // {
      //   path: 'home',
      //   component:HomeComponent
      // },
      {
        path: '',
        loadChildren: () =>
          import('./View/Pages/pages.module').then((m) => PagesModule),
      },

    ],
  },

  {
    path: 'admin',
    component: AdminFullComponent,
    children: [
      {
        path: 'admin',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./Admin/AdminPages/adminpages.module').then((m) => m.AdminPagesModule),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./Admin/AdminPages/extra/extra.module').then((m) => m.AdminExtraModule),
      },

    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
