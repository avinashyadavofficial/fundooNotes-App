import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from 'src/app/services/note/note.service';
import { MatCardModule } from '@angular/material/card';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { NoteIconsComponent } from 'src/app/components/note/note-icons/note-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { Input } from '@angular/core';
@Component({
  selector: 'app-display-note',
  standalone: true,
  imports: [CommonModule, MatCardModule, NoteIconsComponent, MatIconModule],
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css']
})
export class DisplayNoteComponent implements OnInit {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  notes: any[] = []; 

  constructor(
  private noteService: NoteService,
  private refreshService: NoteRefreshService
) {}

  ngOnInit(): void {
    this.fetchNotes(); 
    this.refreshService.refreshNeeded.subscribe(() => {
    this.fetchNotes();
  });
  }

  fetchNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
         console.log('Notes:', res.data.data);
        this.notes = res.data.data.filter((note: any) => !note.isArchived && !note.isDeleted);
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      }
    });
  }
}
