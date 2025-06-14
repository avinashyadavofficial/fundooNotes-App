import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteIconsComponent } from '../note/note-icons/note-icons.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { SearchService } from 'src/app/services/search.service';
import { ViewService } from 'src/app/services/view/view.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [CommonModule, MatCardModule, NoteIconsComponent,MatIconModule],
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit,OnDestroy{
  reminderNotes: any[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  searchQuery:string='';
  private refreshSubscription!: Subscription;
  constructor(
    private noteService: NoteService,
    private refreshService: NoteRefreshService,
    private searchService:SearchService,
    private viewService: ViewService,
  ) {}

 ngOnInit(): void {
  this.loadReminderNotes();
  this.searchService.getSearchQuery().subscribe(query => {
      this.searchQuery = query;
      this.loadReminderNotes(); 
  });

  this.refreshSubscription = this.refreshService.refreshNeeded.subscribe(() => {
      this.loadReminderNotes();
    });
  this.viewService.viewMode$.subscribe(mode => {
      this.viewMode = mode;
  });
}

loadReminderNotes(): void {
    this.noteService.getReminderNotes().subscribe({
      next: (res: any) => {
        const data = res.data?.data || [];
        const filtered = data.filter((note: any) =>
        (
          note.title?.toLowerCase().includes(this.searchQuery) ||
          note.description?.toLowerCase().includes(this.searchQuery)
        )
      );
        this.reminderNotes = filtered.reverse();
      },
      error: (err) => {
        console.error('Failed to load reminder notes:', err);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  formatReminderTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const hours = date.getHours().toString().padStart(2, '0');
  const mins = date.getMinutes().toString().padStart(2, '0');

  return `${isToday ? 'Today' : date.toDateString()}, ${hours}:${mins}`;
}
removeReminder(note: any): void {
  if (!note?.id) return;

  this.noteService.removeReminder([note.id]).subscribe({
    next: () => {
      console.log('Reminder removed');
      note.reminder = []; 
      this.refreshService.triggerRefresh();
    },
    error: err => {
      console.error('Failed to remove reminder', err);
    }
  });
}

}
