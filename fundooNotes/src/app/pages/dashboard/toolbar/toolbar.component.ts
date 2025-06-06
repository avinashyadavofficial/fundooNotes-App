import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() menuClicked = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  searchText = '';
  isGridView = true;

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  onMenuClick() {
    this.menuClicked.emit();
  }
}
