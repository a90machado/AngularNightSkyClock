import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from './app.component';
import {RouterOutlet} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {StarFieldComponent} from './components/star-field/star-field.component';
import {AnalogClockComponent} from './components/analog-clock/analog-clock.component';
import {ButtonToggleThemeComponent} from './components/button-toggle-theme/button-toggle-theme.component';

@NgModule({
  declarations: [
    AppComponent,
    StarFieldComponent,
    ButtonToggleThemeComponent,
    AnalogClockComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
