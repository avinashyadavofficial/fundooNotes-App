import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateNoteComponent } from '../../components/note/create-note/create-note.component';
import { DisplayNoteComponent } from '../../components/note/display-note/display-note.component';
import { RouterOutlet } from '@angular/router';

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
  isCollapsed = true; // ✅ collapsed by default
  isHovering = false;
  viewMode: 'grid' | 'list' = 'grid';
  onViewModeChange(mode: 'grid' | 'list') {
  this.viewMode = mode;
  }
  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  onMouseEnter() {
    this.isHovering = true;
  }

  onMouseLeave() {
    this.isHovering = false;
  }

  get sidenavCollapsed(): boolean {
    return this.isCollapsed && !this.isHovering;
  }
}
