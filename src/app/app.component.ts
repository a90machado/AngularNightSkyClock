import {Component, OnInit, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public stars: WritableSignal<Star[]> = signal([]);
  private starColors: string[] = ["#FFC1A0", "#FE9C7F", "#632B6C", "#BE6590", "#280F36"];
  private maxStars: number = 1000;
  private maxAttempts: number = 50;

  public ngOnInit(): void {
    this.generateStars();
  }

  private generateStars(): void {
    const starSizes: string[] = ['star-0', 'star-1', 'star-2', 'star-3', 'star-4', 'star-5'];
    const validStars: Star[] = [];
    const getRandomDistance:() => number = (): number => this.getRandomInt(1, 5);

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
          duration: this.getRandomInt(2, 5),
          size: starSizes[Math.floor(this.getRandomInt(0, starSizes.length))],
          color: this.starColors[Math.floor(this.getRandomInt(0, this.starColors.length))]
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

    console.log(validStars);
    this.stars.set(validStars);
  }

  private getRandomInt(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

}

interface Star {
  top: number;
  left: number;
  duration: number;
  size: string;
  color: string;
}
