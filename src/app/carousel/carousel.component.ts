import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
  private swipeCoefficient = 300;
  private timeToAutoSwipe = 10_000;
  private slidesHttpService = inject(SlidesHttpService);
  private swipeStartX: WritableSignal<number | undefined> = signal(undefined);

  private intervalRef = 0;

  slides = toSignal(this.slidesHttpService.getSlides(), { initialValue: [] });

  // relative slide position, pointing at current slide index with possible fractional part indicating current swipe
  slidePosition: WritableSignal<number> = signal(0);
  transformStyle = computed(() => `translateX(-${this.slidePosition() * 100}%)`);

  // prevent unwanted swipe while user is reading
  private restartAutoSwipeOnUserInteraction = effect((onCleanup) => {
    this.swipeStartX();
    this.clearAutoSwipe();
    this.startAutoSwipe();

    onCleanup(() => this.clearAutoSwipe());
  });

  onSwipeStart = ({ clientX }: Coordinate) => this.swipeStartX.set(clientX);

  onSwipeMove = (coordinate: Coordinate) => {
    const start = this.swipeStartX();

    // prevent 'drag' event from firing unexpected 0 at the end of dragging
    if (start !== undefined && coordinate.clientX) {
      const relativeSwipeLength = (start - coordinate.clientX) / this.swipeCoefficient;
      this.updateSlidePosition(Math.min(1, Math.max(relativeSwipeLength, -1))); // swipe a bit, but not more than 1 slide
      this.onSwipeStart(coordinate);
    }
  };

  onTouchStart = (event: TouchEvent) => this.onSwipeStart(event.touches[0]);
  onTouchMove = (event: TouchEvent) => this.onSwipeMove(event.changedTouches[0]);

  onSwipeEnd = () => {
    this.roundSlidePosition();
    this.swipeStartX.set(undefined);
  }

  private updateSlidePosition = (inc: number) =>
    this.slidePosition.update((value) => this.normalize(value + inc));

  private roundSlidePosition = () =>
    this.slidePosition.update((value) => this.normalize(Math.round(value)));

  // normalize the value, so it stays in [0, slides.length) to cycle the carousel
  private normalize = (x: number) => (x + this.slides().length) % this.slides().length;

  private startAutoSwipe = () => {
    this.intervalRef = setInterval(() => this.updateSlidePosition(1), this.timeToAutoSwipe);
  }

  private clearAutoSwipe = () => clearInterval(this.intervalRef);
}
