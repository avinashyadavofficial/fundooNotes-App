import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { NoteIconsComponent } from '../note-icons/note-icons.component';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NoteIconsComponent
  ],
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent {
  isExpanded = false;
  selectedColor = '#ffffff';
  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private refreshService: NoteRefreshService,
    private snackBar: MatSnackBar
  ) {
    this.noteForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  onFocus(): void {
    this.isExpanded = true;
  }

  onColorChanged(color: string): void {
    this.selectedColor = color;
  }

  onClose(): void {
    const { title, description } = this.noteForm.value;

    if (!title.trim() && !description.trim()) {
      this.resetForm();
      return;
    }

    const payload = { title, description, color: this.selectedColor };

    this.noteService.createNote(payload).subscribe({
      next: () => {
        this.snackBar.open('Note created!', 'Close', { duration: 2000 });
        this.refreshService.triggerRefresh();
        this.resetForm();
      },
      error: () => {
        this.snackBar.open('Failed to create note', 'Close', { duration: 2000 });
      }
    });
  }

  private resetForm(): void {
    this.noteForm.reset();
    this.selectedColor = '#ffffff';
    this.isExpanded = false;
  }
}
