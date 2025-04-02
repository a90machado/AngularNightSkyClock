import {Component, signal, WritableSignal} from '@angular/core';
import {Theme} from './enums/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public theme: WritableSignal<Theme> = signal(Theme.Night);

  public changeTheme(newTheme: Theme): void {
    this.theme.set(newTheme);
  }
}




