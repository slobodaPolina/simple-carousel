import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { SlideComponent } from '../slide/slide.component';
import { SlidesHttpService } from '../services/slides.http.service';
import { toSignal } from '@angular/core/rxjs-interop';

type Coordinate = { clientX: number };

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SlideComponent],
})
export class CarouselComponent {
  private minimalSwipeLength = 50;
  private slidesHttpService = inject(SlidesHttpService)
  private swipeStartX: WritableSignal<number | undefined> = signal(undefined);

  index: WritableSignal<number> = signal(0);
  slides = toSignal(this.slidesHttpService.getSlides(), { initialValue: [] });
  transformStyle = computed(() => `translateX(-${this.index() * 100}%)`);

  onSwipeStart = ({ clientX }: Coordinate) => {
    this.swipeStartX.set(clientX);
  };

  onSwipeEnd = ({ clientX }: Coordinate) => {
    const start = this.swipeStartX();

    if (start !== undefined) {
      const diff = start - clientX;

      if (diff > this.minimalSwipeLength) {
        this.updateIndex(1);
      } else if (diff < -this.minimalSwipeLength) {
        this.updateIndex(-1);
      }
    }
  };

  onTouchStart = (event: TouchEvent) => this.onSwipeStart(event.touches[0]);
  onTouchEnd = (event: TouchEvent) => this.onSwipeEnd(event.changedTouches[0]);

  private updateIndex = (inc: number) => {
    this.index.update((value) => (value + inc + this.slides().length) % this.slides().length);
  };
}
