import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from './app.component';
import {RouterOutlet} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {StarFieldComponent} from './components/star-field/star-field.component';

@NgModule({
  declarations: [
    AppComponent,
    StarFieldComponent,  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
