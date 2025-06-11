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
  @Input() title: string = 'Keep';

  viewMode: 'grid' | 'list' = 'grid';
  searchText = '';

  constructor(private viewService: ViewService, private router: Router) {}

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
}
