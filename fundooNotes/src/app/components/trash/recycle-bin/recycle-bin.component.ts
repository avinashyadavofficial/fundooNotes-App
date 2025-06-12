import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recycle-bin',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.css']
})
export class RecycleBinComponent {
   constructor(private dialogRef: MatDialogRef<RecycleBinComponent>) {}
   
  emptybin() {
    this.dialogRef.close(true);
  }
   
  cancel() {
    this.dialogRef.close(false);
  }
}
