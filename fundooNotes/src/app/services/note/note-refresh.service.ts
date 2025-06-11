import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteRefreshService {
  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded() {
    return this.refreshNeeded$.asObservable();
  }

  triggerRefresh(): void {
    this.refreshNeeded$.next();
  }
}
