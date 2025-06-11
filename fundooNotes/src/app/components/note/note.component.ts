import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteComponent } from "./create-note/create-note.component";
import { DisplayNoteComponent } from "./display-note/display-note.component";
import { ViewService } from 'src/app/services/view/view.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, CreateNoteComponent, DisplayNoteComponent],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private viewService: ViewService) {
    this.viewService.viewMode$.subscribe((mode: 'grid' | 'list') => {
      this.viewMode = mode;
    });
  }
}
