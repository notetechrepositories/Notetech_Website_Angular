import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './View/Layout/full/full.component';
import { AdminFullComponent } from './Admin/Layout/admin-full/admin-full.component';
import { AdminBlankComponent } from './Admin/Layout/admin-blank/admin-blank.component';


const routes: Routes = [
  // User Routes
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./View/Pages/pages.module').then((m) => m.PagesModule), // ✅ Fix lazy loading syntax
      },
    ],
  },

  // Admin Routes (Protected by AuthGuard)
  {
    path: 'admin',
    component: AdminFullComponent,
    // canActivate: [AuthGuard], // ✅ Enable AuthGuard if needed
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./Admin/AdminPages/adminpages.module').then((m) => m.AdminPagesModule),
      },
      {
        path: '', // ✅ This loads the extra module
        loadChildren: () =>
          import('./Admin/AdminPages/extra/extra.module').then((m) => m.AdminExtraModule),
      },
    ],
  },


  // Authentication Routes (No Guard Needed)
  {
    path: '',
    component: AdminBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./Admin/AdminPages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },

  // Wildcard Route (Handle 404 - Not Found)
  {
    path: '**',
    redirectTo: '/home', // ✅ Redirect unknown paths to home
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
