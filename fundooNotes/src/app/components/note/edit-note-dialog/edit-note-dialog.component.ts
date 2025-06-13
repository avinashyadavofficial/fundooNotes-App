import {
  Component,
  Inject,
  OnDestroy,
  AfterViewInit,
  NgZone,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { NoteService } from 'src/app/services/note/note.service';
import { NoteIconsComponent } from '../note-icons/note-icons.component';

@Component({
  selector: 'app-edit-note-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    TextFieldModule,
    NoteIconsComponent
  ],
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css']
})
export class EditNoteDialogComponent implements AfterViewInit, OnDestroy {
  noteForm: FormGroup;
  currentDate = new Date();
  private isSaved = false;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public note: any,
    private ngZone: NgZone
  ) {
    this.noteForm = this.fb.group({
      title: [note.title],
      description: [note.description]
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.onStable.pipe().subscribe(() => {
      this.autosize?.resizeToFitContent(true);
    });

    this.noteForm.get('description')?.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.autosize?.resizeToFitContent(true);
      }, 0);
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
      this.noteService.updateNote(updatedNote).subscribe(); // auto-save on close
    }
  }

  onClose(): void {
    this.onSave();
  }
}
