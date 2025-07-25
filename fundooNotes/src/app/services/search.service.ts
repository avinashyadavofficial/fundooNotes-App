import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchQuery$ = new BehaviorSubject<string>('');

  setSearchQuery(query: string) {
    this.searchQuery$.next(query.trim().toLowerCase());
  }

  getSearchQuery() {
    return this.searchQuery$.asObservable();
  }
}
