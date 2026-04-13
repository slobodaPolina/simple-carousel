import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { SliderData } from '../interfaces/slider';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SafeHtmlPipe],
})
export class SlideComponent {
  config = input<SliderData>();
}
