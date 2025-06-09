import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
@Component({
  selector: 'app-note-icons',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './note-icons.component.html',
  styleUrls: ['./note-icons.component.css']
})
export class NoteIconsComponent {

  constructor(
    private noteService: NoteService,
    private refreshService: NoteRefreshService
  ) {}

  @Input() showReminder = true;
  @Input() showCollaborator = true;
  @Input() showColor = true;
  @Input() showImage = true;
  @Input() showArchive = true;
  @Input() showTrash = true;
  @Input() showMore = true;
  @Input() showUndo = true;
  @Input() showRedo = true;
    
  @Input() note: any;
  @Output() colorChanged = new EventEmitter<void>();

colors: string[] = [
  '#ffffff', '#f28b82', '#fbbc04', '#fff475',
  '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
  '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
];

showColorPicker = false;

toggleColorPicker(): void {
  this.showColorPicker = !this.showColorPicker;
}

selectColor(color: string): void {
  if (!this.note?.id) return;

  this.noteService.changeNoteColor(this.note.id, color).subscribe({
    next: () => {
      this.refreshService.triggerRefresh();
      console.log('Color updated:', color);
      this.note.color = color; 
      this.showColorPicker = false;
    },
    error: (err) => {
      console.error('Color change failed:', err);
    }
  });
}


}
