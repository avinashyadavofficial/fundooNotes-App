import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from 'src/app/services/note/note.service';
import { MatCardModule } from '@angular/material/card';
import { NoteIconsComponent } from '../note-icons/note-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';

@Component({
  selector: 'app-display-note',
  standalone: true,
  imports: [CommonModule, MatCardModule, NoteIconsComponent, MatIconModule],
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css']
})
export class DisplayNoteComponent implements OnInit, OnChanges {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Input() showArchivedOnly: boolean = false;
  @Input() searchText: string = '';

  notes: any[] = [];

  constructor(
    private noteService: NoteService,
    private refreshService: NoteRefreshService
  ) {}

  ngOnInit(): void {
    this.loadNotes();

    this.refreshService.refreshNeeded.subscribe(() => {
      console.log('REFRESH EVENT RECEIVED - reloading notes');
      this.loadNotes();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showArchivedOnly'] || changes['searchText']) {
      this.loadNotes();
    }
  }

  loadNotes(): void {
    console.log('Filtered notes:', this.notes);

  this.noteService.getNotes().subscribe({
    next: (res: any) => {
      const allNotes = res.data?.data || [];
      this.notes = allNotes.filter((note: any) => !note.isArchived && !note.isDeleted);
    },
    error: (err) => {
      console.error('Error fetching notes:', err);
    }
  });
}

}
