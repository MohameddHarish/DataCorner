import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog-component',
  templateUrl: './delete-confirmation-dialog-component.component.html',
  styleUrls: ['./delete-confirmation-dialog-component.component.scss']
})
export class DeleteConfirmationDialogComponentComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
