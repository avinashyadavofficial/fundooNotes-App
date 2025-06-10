import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteRefreshService } from 'src/app/services/note/note-refresh.service';
import { NoteIconsComponent } from 'src/app/components/note/note-icons/note-icons.component';

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
  selectedColor: string = '#fff';

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

  onColorChanged(color: string) {
    this.selectedColor = color;
  }

  onClose(): void {
    const { title, description } = this.noteForm.value;

    if (title.trim() || description.trim()) {
      const payload = {
        title,
        description,
        color: this.selectedColor
      };

      this.noteService.createNote(payload).subscribe({
        next: () => {
          this.refreshService.triggerRefresh();
          this.snackBar.open('Note created!', 'Close', { duration: 2000 });
          this.noteForm.reset();
          this.isExpanded = false;
          this.selectedColor = '#fff';
        },
        error: (err: any) => {
          console.error(err);
          this.snackBar.open('Failed to create note', 'Close', { duration: 2000 });
        }
      });
    } else {
      this.noteForm.reset();
      this.isExpanded = false;
      this.selectedColor = '#fff';
    }
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.isExpanded) {
      this.onClose();
    }
  }
}
