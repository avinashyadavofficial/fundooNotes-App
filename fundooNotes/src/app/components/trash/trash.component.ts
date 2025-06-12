import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/services/view/view.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
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
    private viewService: ViewService,
    private dialog: MatDialog
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

  openDeleteDialog(noteId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      backdropClass: 'custom-dialog-backdrop', 
      disableClose: false 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.noteService.deleteForever({ noteIdList: [noteId] }).subscribe({
          next: () => this.refreshService.triggerRefresh(),
          error: err => console.error('Delete failed:', err)
        });
      }
    });
  }
  emptyRecycleBin(): void {
  const dialogRef = this.dialog.open(RecycleBinComponent, {
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      const ids = this.trashedNotes.map(note => note.id);
      const payload = { noteIdList: ids };

      this.noteService.deleteForever(payload).subscribe({
        next: () => {
          this.refreshService.triggerRefresh();
        },
        error: (err) => {
          console.error('Failed to delete notes:', err);
        }
      });
    }
  });
}

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }
}
