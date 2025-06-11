import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/services/view/view.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NoteIconsComponent } from 'src/app/components/note/note-icons/note-icons.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-archive',
  standalone: true,
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
  imports: [CommonModule, MatCardModule, NoteIconsComponent,MatIconModule]
})
export class ArchiveComponent implements OnInit, OnDestroy {
  archivedNotes: any[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  private refreshSubscription!: Subscription;

  constructor(
    private noteService: NoteService,
    private refreshService: NoteRefreshService,
    private viewService: ViewService
  ) {}

  ngOnInit(): void {
    this.loadArchivedNotes();

    this.refreshSubscription = this.refreshService.refreshNeeded.subscribe(() => {
      this.loadArchivedNotes();
    });

    this.viewService.viewMode$.subscribe(mode => {
      this.viewMode = mode;
    });
  }

  loadArchivedNotes(): void {
    this.noteService.getArchivedNotes().subscribe({
      next: (res: any) => {
        const data = res.data?.data || [];
        this.archivedNotes = data.filter((note: any) => note.isArchived && !note.isDeleted).reverse();
      },
      error: (err) => {
        console.error('Failed to load archived notes:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
