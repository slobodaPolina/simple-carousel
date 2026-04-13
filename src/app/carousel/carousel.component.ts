import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';
import { SliderData } from '../interfaces/slider';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SlideComponent],
})
export class CarouselComponent {
  // todo get from the service; 'load' from a json
  slides = [
    {
      title: 'WinzUp Loyalty Program',
      description: 'Get up to <span class="accent">35% in rewards</span>: daily rakeback, weekly cashback and level-up bonuses',
      buttonText: 'Join now',
      background: 'winzup-bg-mob.webp', // todo either here in .public (or other assets directory configured in angular.json or s3 external link or whatever)
      foreground: 'winzup_mob.png',
    },
    {
      title: `Valentine's Fortune Drops`,
      description: 'Trigger random prizes and win a share of <span class="accent">€30,000</span>!',
      buttonText: 'Learn more',
      background: 'ValentinesFortuneDrops_mob-bg.png',
      foreground: 'ValentinesFortuneDrops_mob-pic.png',
    },
    {
      title: 'Wheel of Winz',
      description: 'Spin the wheel to win up to <span class="accent">€15,000</span> weekly',
      buttonText: 'Spin now',
      background: 'wheel-mob-bg.webp',
      foreground: 'wheel-mob.png',
    },
  ] as unknown as SliderData[]; // todo get rid of unknown
}
