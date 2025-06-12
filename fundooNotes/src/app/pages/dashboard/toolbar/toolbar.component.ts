import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ViewService } from 'src/app/services/view/view.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() menuClicked = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
  title: string = 'Keep';
  refreshing = false;
  viewMode: 'grid' | 'list' = 'grid';
  searchText = '';

  constructor(
    private viewService: ViewService, 
    private router: Router,
    private refreshService: NoteRefreshService,
    private searchService: SearchService  
  ) {}

  ngOnInit(): void {
    this.updateTitleBasedOnRoute();

    this.router.events.subscribe(() => {
      this.updateTitleBasedOnRoute();
    });
  }

  updateTitleBasedOnRoute(): void {
    const path = this.router.url;

    if (path.includes('/archive')) {
      this.title = 'Archive';
    } else if (path.includes('/trash')) {
      this.title = 'Trash';
    } else if (path.includes('/reminders')) {
      this.title = 'Reminders';
    } else {
      this.title = 'Keep';
    }
  }

  onMenuClick(): void {
    this.menuClicked.emit();
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    this.viewService.setViewMode(this.viewMode);
    this.viewModeChange.emit(this.viewMode);
  }

  
  updateTitleFromRoute(): void {
    const current = this.router.url;
    this.title = current.includes('/archive') ? 'Archive' : 'Keep';
  }
  

triggerManualRefresh(): void {
  this.refreshing = true;
  this.refreshService.triggerRefresh();

  setTimeout(() => this.refreshing = false, 500); // stop spin
}
  onSearchChange(): void {
  this.searchService.setSearchQuery(this.searchText);
  }

}
