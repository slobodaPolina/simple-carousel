import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
