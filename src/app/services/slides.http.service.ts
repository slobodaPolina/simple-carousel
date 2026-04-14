import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SliderData } from '../interfaces/slider';
import { catchError } from 'rxjs';

@Injectable()
export class SlidesHttpService {
  private httpClient = inject(HttpClient);

  getSlides() {
    // trying to load api
    return this.httpClient.get<SliderData[]>('api/v1/slides').pipe(
      // load local mock
      catchError(() => this.httpClient.get<SliderData[]>('slider-data.json')),
    );
  }
}
