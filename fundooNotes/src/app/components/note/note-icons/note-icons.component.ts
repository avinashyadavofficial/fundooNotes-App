import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-note-icons',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatMenuModule],
  templateUrl: './note-icons.component.html',
  styleUrls: ['./note-icons.component.css']
})
export class NoteIconsComponent {
  @Input() note: any = {}; 
  @Input() showReminder = true;
  @Input() showCollaborator = true;
  @Input() showColor = true;
  @Input() showImage = true;
  @Input() showArchive = true;
  @Input() showTrash = true;
  @Input() showMore = true;
  @Input() showUndo = true;
  @Input() showRedo = true;
  @Input() showUnarchive = false;


  @Output() colorChanged = new EventEmitter<string>();

  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
  ];

  showColorPicker = false;

  constructor(
    private noteService: NoteService,
    private refreshService: NoteRefreshService
  ) {}

  toggleColorPicker(): void {
    this.showColorPicker = !this.showColorPicker;
  }

  selectColor(color: string): void {
    if (this.note?.id) {
      this.noteService.changeNoteColor(this.note.id, color).subscribe({
        next: () => {
          this.note.color = color;
          this.colorChanged.emit(color);
          this.showColorPicker = false;
        },
        error: (err) => {
          console.error('Color update failed:', err);
        }
      });
    } else {
      this.colorChanged.emit(color);
      this.showColorPicker = false;
    }
  }

  onArchiveClick(): void {
    const payload = {
      noteIdList: [this.note?.id],
      isArchived: true
    };

    this.noteService.archiveNote(payload).subscribe({
      next: () => {
        console.log('Archived note, triggering refresh');
        this.refreshService.triggerRefresh(); 
      },
      error: (err) => {
        console.error('Archive failed:', err);
      }
    });
  }
   onUnArchiveClick(): void {
    const payload = {
      noteIdList: [this.note?.id],
      isArchived: false
    };

    this.noteService.archiveNote(payload).subscribe({
      next: () => {
        console.log('Unarchived note, triggering refresh');
        this.refreshService.triggerRefresh(); 
      },
      error: (err) => {
        console.error('Unarchived failed:', err);
      }
    });
  }

  onPinClick(): void {
    if (!this.note?.id) return;

    const payload = {
      noteIdList: [this.note.id],
      isPined: !this.note.isPined 
    };

    this.noteService.togglePinNote(payload).subscribe({
      next: () => {
        this.refreshService.triggerRefresh();
      },
      error: (err) => {
        console.error('Pin toggle failed:', err);
      }
    });
  }
  onDeleteClick(): void {
  const payload = {
    noteIdList: [this.note?.id],
    isDeleted: true
  };

  this.noteService.trashNote(payload).subscribe({
    next: () => {
      setTimeout(() => this.refreshService.triggerRefresh(), 200); 
    },
    error: (err) => {
      console.error('Move to Trash failed:', err);
    }
  });
}
 




}
