import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { ComonPageComponent } from './comon-page/comon-page.component';
import { CommonPage2Component } from './common-page-2/common-page-2.component';
import { ContactComponent } from './contact/contact.component';


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
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact',
    },
  },
  {
    path: 'pages-grid/:id',
    component: CommonPage2Component,
  },

  {
    path: 'pages-row/:id',
    component: ComonPageComponent,
    data: {
      title: 'Page',
    },
  },




];
