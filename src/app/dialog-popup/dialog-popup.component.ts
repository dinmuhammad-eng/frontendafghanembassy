import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.css']
})
export class DialogPopupComponent {
  constructor(public dialogRef: MatDialogRef<DialogPopupComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

