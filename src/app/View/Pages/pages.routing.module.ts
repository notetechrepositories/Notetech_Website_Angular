import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { ComonPageComponent } from './comon-page/comon-page.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'service',
    component: ServiceComponent,
    data: {
      title: 'Service',
    },
  },

  {
    path: 'pages/:id',
    component: ComonPageComponent,
    data: {
      title: 'Page',
    },
  },


];
