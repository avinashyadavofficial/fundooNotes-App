import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewService {
  private viewModeSubject = new BehaviorSubject<'grid' | 'list'>('grid');
  viewMode$ = this.viewModeSubject.asObservable();

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewModeSubject.next(mode);
  }
}
