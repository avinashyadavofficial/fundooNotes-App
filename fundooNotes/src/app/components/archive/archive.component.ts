import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from 'src/app/pages/dashboard/toolbar/toolbar.component';
import { DisplayNoteComponent } from '../note/display-note/display-note.component';
@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, DisplayNoteComponent],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {

}
