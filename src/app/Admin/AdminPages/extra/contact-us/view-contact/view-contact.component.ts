import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrl: './view-contact.component.css'
})
export class ViewContactComponent {
  formattedDate: string = '';
  constructor(
    public dialogRef: MatDialogRef<ViewContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    // Format the date in TypeScript before binding
    if (this.data.insert_date) {
      this.formattedDate = new Date(this.data.insert_date).toLocaleDateString();
    }
  }
}

