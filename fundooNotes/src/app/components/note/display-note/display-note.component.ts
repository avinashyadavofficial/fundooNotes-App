import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from 'src/app/services/note/note.service';
import { MatCardModule } from '@angular/material/card';
import { NoteIconsComponent } from '../note-icons/note-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { SearchService } from 'src/app/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-display-note',
  standalone: true,
  imports: [CommonModule, MatCardModule, NoteIconsComponent, MatIconModule, MatDialogModule],
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css']
})
export class DisplayNoteComponent implements OnInit, OnChanges {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Input() showArchivedOnly: boolean = false;
  @Input() searchText: string = '';
  pinnedNotes: any[] = [];
  otherNotes: any[] = [];
  searchQuery: string = '';
  notes: any[] = [];

  constructor(
    private noteService: NoteService,
    private refreshService: NoteRefreshService,
    private searchService: SearchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNotes();

    this.searchService.getSearchQuery().subscribe(query => {
      this.searchQuery = query;
      this.loadNotes();
    });

    this.refreshService.refreshNeeded.subscribe(() => {
      this.loadNotes();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showArchivedOnly'] || changes['searchText']) {
      this.loadNotes();
    }
  }

  trackByNoteId(index: number, note: any): string {
    return note.id;
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
        const allNotes = res.data?.data || [];
        const filtered = allNotes.filter((note: any) =>
          !note.isArchived &&
          !note.isDeleted &&
          (
            note.title.toLowerCase().includes(this.searchQuery) ||
            note.description.toLowerCase().includes(this.searchQuery)
          )
        );
        this.pinnedNotes = filtered.filter((n: any) => n.isPined).reverse();
        this.otherNotes = filtered.filter((n: any) => !n.isPined).reverse();
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      }
    });
  }

  openEditDialog(note: any): void {
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      data: note,
      backdropClass: 'dialog-backdrop',
      panelClass: 'edit-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshService.triggerRefresh();
      }
    });
  }
}
