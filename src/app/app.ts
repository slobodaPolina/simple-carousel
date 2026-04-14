import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { SlidesHttpService } from './services/slides.http.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [SlidesHttpService],
})
export class App {}
