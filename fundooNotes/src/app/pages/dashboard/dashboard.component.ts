import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateNoteComponent } from '../../components/note/create-note/create-note.component';
import { DisplayNoteComponent } from '../../components/note/display-note/display-note.component';
import { RouterOutlet } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    ToolbarComponent,
    SidenavComponent,
    CreateNoteComponent,
    DisplayNoteComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private searchService: SearchService) {}
  isCollapsed = true;
  isHovering = false;
  viewMode: 'grid' | 'list' = 'grid';
  searchQuery: string = '';

  toggleSidenav(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onMouseEnter(): void {
    this.isHovering = true;
  }

  onMouseLeave(): void {
    this.isHovering = false;
  }

  get sidenavCollapsed(): boolean {
    return this.isCollapsed && !this.isHovering;
  }

  onViewModeChange(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
  
onSearchInput(query: string): void {
  this.searchService.setSearchQuery(query);
}
}
