import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteIconsComponent } from '../note-icons/note-icons.component'; 
import { MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-note-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NoteIconsComponent,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css']
})
export class EditNoteDialogComponent implements OnDestroy {
  noteForm: FormGroup;
  currentDate = new Date();
  private isSaved = false;
  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public note: any
  ) {
    this.noteForm = this.fb.group({
      title: [note.title],
      description: [note.description]
    });
  }

  onSave(): void {
    const updatedNote = {
      noteId: this.note.id,
      title: this.noteForm.value.title,
      description: this.noteForm.value.description
    };

    this.noteService.updateNote(updatedNote).subscribe({
      next: () => {
        this.isSaved = true;
        this.dialogRef.close(true);
      },
      error: err => {
        console.error('Update failed:', err);
        this.dialogRef.close(false);
      }
    });
  }
  ngOnDestroy(): void {
    if (!this.isSaved) {
      const updatedNote = {
        noteId: this.note.id,
        title: this.noteForm.value.title,
        description: this.noteForm.value.description
      };

      this.noteService.updateNote(updatedNote).subscribe(); // auto-save if not already saved
    }
  }

  onClose(): void {
    this.onSave();
  }
}
