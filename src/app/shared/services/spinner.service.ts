import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count = 0;
  private spinner$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  getSpinnerObserver(): Observable<boolean> {
    return this.spinner$.asObservable();
  }

  show() {
      this.spinner$.next(true);
  }

  hide() {
      this.spinner$.next(false);
  }
}
