import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HostListener, ElementRef } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { NoteIconsComponent } from '../note-icons/note-icons.component';
import { TextFieldModule } from '@angular/cdk/text-field';

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
    NoteIconsComponent,
    TextFieldModule
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
    private snackBar: MatSnackBar,
    private elementRef: ElementRef
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

  const trimmedTitle = title?.trim();
  const trimmedDescription = description?.trim();

  if (trimmedTitle || trimmedDescription) {
    const payload = {
      title: trimmedTitle,
      description: trimmedDescription,
      color: this.selectedColor
    };

    this.noteService.createNote(payload).subscribe({
      next: () => {
        this.refreshService.triggerRefresh();
        this.snackBar.open('Note created!', 'Close', { duration: 2000 });
        this.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        this.snackBar.open('Failed to create note', 'Close', { duration: 2000 });
        this.resetForm(); 
      }
    });
  } else {
    this.resetForm(); 
  }
}


  private resetForm(): void {
    this.noteForm.reset();
    this.selectedColor = '#fff';
    this.isExpanded = false;
  }
  @HostListener('document:click', ['$event.target'])
onClickOutside(target: HTMLElement): void {
  const clickedInside = this.elementRef.nativeElement.contains(target);
  if (!clickedInside && this.isExpanded) {
    this.onClose();
  }
}

}
