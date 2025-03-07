import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlankComponent } from './View/Layout/blank/blank.component';
import { FullComponent } from './View/Layout/full/full.component';
import { AdminBlankComponent } from './Admin/Layout/admin-blank/admin-blank.component';
import { AdminFullComponent } from './Admin/Layout/admin-full/admin-full.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './Admin/Layout/admin-full/header/header.component';
import { SidebarComponent } from './Admin/Layout/admin-full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppDashboardComponent } from './Admin/AdminPages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppNavItemComponent } from './Admin/Layout/admin-full/sidebar/NavItem/nav-item.component';
import { BrandingComponent } from './Admin/Layout/admin-full/sidebar/branding.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CountUpModule } from 'ngx-countup';

import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    FullComponent,
    AdminBlankComponent,
    AdminFullComponent,
    HeaderComponent,
    SidebarComponent,
    BrandingComponent,
    AppNavItemComponent,
    AppDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    NgScrollbarModule,
    CountUpModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
