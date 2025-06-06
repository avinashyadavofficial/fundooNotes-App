import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, SidenavComponent, MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isCollapsed = false;
  isHovering = false;

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  onMouseEnter() {
    if (this.isCollapsed) {
      this.isHovering = true;
    }
  }

  onMouseLeave() {
    this.isHovering = false;
  }

  get sidenavCollapsed(): boolean {
    return this.isCollapsed && !this.isHovering;
  }
}
