import {Component, input, InputSignal, OnChanges, OnInit, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {Theme} from '../../enums/theme.enum';
import {Star} from '../../models/star.model';

@Component({
  selector: 'app-star-field',
  templateUrl: './star-field.component.html',
  styleUrl: './star-field.component.scss'
})
export class StarFieldComponent implements OnInit, OnChanges {
  public theme: InputSignal<Theme> = input.required<Theme>();
  public stars: WritableSignal<Star[]> = signal([]);
  private maxStars: number = 2000;
  private maxAttempts: number = 500;

  private themeColors: Record<Theme, string[]> = {
    [Theme.Night]: ['#FFFFFF', '#B0C4DE', '#C0C0C0', '#A9A9A9', '#708090'],
    [Theme.Sunset]: ['#FF6347', '#8B0000', '#800000', '#DC143C', '#B22222'],
    [Theme.Aurora]: ['#00FF7F', '#7FFFD4', '#4682B4', '#6A5ACD', '#DA70D6']
  };

  public ngOnInit(): void {
    this.generateStars();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme']) {
      this.generateStars();
    }
  }

  private generateStars(): void {
    const starSizes: string[] = ['star-0', 'star-1', 'star-2', 'star-3', 'star-4', 'star-5'];
    const validStars: Star[] = [];
    const colors: string[] = this.themeColors[this.theme()]; // Get colors based on theme

    const getRandomDistance = (): number => this.getRandomInt(0.5, 5);

    const isTooClose = (newStar: Star, stars: Star[]): boolean => {
      return stars.some((star: Star): boolean => {
        const distance: number = Math.sqrt(
          Math.pow(star.top - newStar.top, 2) + Math.pow(star.left - newStar.left, 2)
        );
        return distance < getRandomDistance();
      });
    };

    for (let i = 0; i < this.maxStars; i++) {
      let attempts = 0;
      let newStar: Star | null = null;

      while (attempts < this.maxAttempts) {
        newStar = {
          top: this.getRandomInt(0, 100),
          left: this.getRandomInt(0, 100),
          duration: this.getRandomInt(1, 3),
          size: starSizes[Math.floor(this.getRandomInt(0, starSizes.length))],
          color: colors[Math.floor(this.getRandomInt(0, colors.length))]
        };

        if (!isTooClose(newStar, validStars)) {
          validStars.push(newStar);
          break;
        }

        attempts++;
      }

      if (validStars.length >= this.maxStars) {
        break;
      }
    }
    this.stars.set(validStars);
  }

  public changeTheme(newTheme: Theme): void {
    if (this.themeColors[newTheme]) {
      this.generateStars();
    }
  }

  private getRandomInt(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

}
