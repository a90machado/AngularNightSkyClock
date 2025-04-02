import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {Theme} from '../../enums/theme.enum';

@Component({
  selector: 'app-button-toggle-theme',
  templateUrl: './button-toggle-theme.component.html',
  styleUrl: './button-toggle-theme.component.scss'
})
export class ButtonToggleThemeComponent {
  public theme: InputSignal<Theme> = input.required<Theme>();
  public toggleTheme: OutputEmitterRef<Theme> = output<Theme>();
  public iconsTheme: IconTheme[] = [
    { icon: 'dark_mode', theme: Theme.Night },
    { icon: 'flare', theme: Theme.Sunset },
    { icon: 'public', theme: Theme.Aurora }
  ];
  public themeIcons: Record<Theme, string> = {
    [Theme.Night]: 'dark_mode',
    [Theme.Sunset]: 'flare',
    [Theme.Aurora]: 'public'
  };

  public getIconClass(icon: string): string {
    return this.themeIcons[this.theme()] === icon ? 'active ' + this.theme() : this.theme();
  }

  public changeTheme(icon: IconTheme): void {
    this.toggleTheme.emit(icon.theme);
  }
}

interface IconTheme {
  icon: string;
  theme: Theme;
}
