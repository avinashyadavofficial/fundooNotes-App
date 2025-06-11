import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/services/view/view.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-trash',
  standalone: true,
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
  imports: [CommonModule, MatCardModule, MatIconModule,MatDialogModule]
})
export class TrashComponent implements OnInit, OnDestroy {
  trashedNotes: any[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  private refreshSubscription!: Subscription;

  constructor(
    private noteService: NoteService,
    private refreshService: NoteRefreshService,
    private viewService: ViewService
  ) {}

  ngOnInit(): void {
    this.loadTrashedNotes();

    this.refreshSubscription = this.refreshService.refreshNeeded.subscribe(() => {
      this.loadTrashedNotes();
    });

    this.viewService.viewMode$.subscribe(mode => {
      this.viewMode = mode;
    });
  }

  loadTrashedNotes(): void {
    this.noteService.getTrashedNotes().subscribe({
      next: (res: any) => {
        this.trashedNotes = res.data?.data || [];
      },
      error: (err) => {
        console.error('Failed to load trashed notes:', err);
      }
    });
  }

  restoreNote(noteId: string): void {
    const payload = {
      noteIdList: [noteId],
      isDeleted: false
    };

    this.noteService.trashNote(payload).subscribe({
      next: () => {
        this.refreshService.triggerRefresh();
      },
      error: (err) => {
        console.error('Restore failed:', err);
      }
    });
  }

  deleteNoteForever(noteId: string): void {
    const payload = {
      noteIdList: [noteId]
    };

    this.noteService.deleteForever(payload).subscribe({
      next: () => {
        this.refreshService.triggerRefresh();
      },
      error: (err) => {
        console.error('Delete forever failed:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }
}
