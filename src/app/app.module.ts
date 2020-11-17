import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Peticiones
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
