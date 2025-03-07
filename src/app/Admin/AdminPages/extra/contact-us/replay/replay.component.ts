import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrl: './replay.component.css'
})
export class ReplayComponent {
  replyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.replyForm = this.fb.group({
      subject: [data.subject, Validators.required],
      message: ['', Validators.required]  // HTML editor message field
    });
  }

  submitReply() {
    if (this.replyForm.valid) {
      this.dialogRef.close(this.replyForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
