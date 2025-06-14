import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-note-icons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ],
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
  @Input() showFormatColorText=false;
  @Output() reminderSet = new EventEmitter<string>();
  @Output() colorChanged = new EventEmitter<string>();
  customDate: Date | null = null;
  customTime: string = '';

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

  togglePin(): void {
  if (!this.note?.id) return;

  const payload = {
    noteIdList: [this.note.id],
    isPined: !this.note.isPined
  };

  this.noteService.pinNote(payload).subscribe({
    next: () => {
      this.refreshService.triggerRefresh();
    },
    error: (err) => {
      console.error('Pin/Unpin failed:', err);
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
setReminder(option: 'laterToday' | 'tomorrow' | 'nextWeek') {
    const now = new Date();
    let reminder: Date;

    switch (option) {
      case 'laterToday':
        reminder = new Date(now.setDate(now.getDate()));
        reminder.setHours(20, 0, 0, 0);
        break;
      case 'tomorrow':
        reminder = new Date(now.setDate(now.getDate() + 1));
        reminder.setHours(8, 0, 0, 0);
        break;
      case 'nextWeek':
        reminder = new Date(now.setDate(now.getDate() + (8 - now.getDay())));
        reminder.setHours(8, 0, 0, 0);
        break;
    }

    this.saveReminder([reminder.toISOString()]);
  }

  confirmCustomReminder() {
    if (this.customDate && this.customTime) {
      const [hours, minutes] = this.customTime.split(':').map(Number);
      const reminder = new Date(this.customDate);
      reminder.setHours(hours, minutes, 0, 0);
      this.saveReminder([reminder.toISOString()]);
    }
  }

  saveReminder(reminderArray: string[]) {
  const payload = {
    noteIdList: [this.note.id],
    reminder: reminderArray
  };
  

  this.noteService.addUpdateReminderNotes(payload.noteIdList, payload.reminder).subscribe({
    next: () => {
      console.log('Reminder saved successfully');
    },
    error: err => {
      console.error('Reminder failed', err);
    }
  });
}
  


}
