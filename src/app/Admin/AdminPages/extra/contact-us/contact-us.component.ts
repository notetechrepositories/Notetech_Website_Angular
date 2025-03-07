import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsService } from '../../../../Services/Admin/contact-us/contact-us.service';
import { ViewContactComponent } from './view-contact/view-contact.component';
import Swal from 'sweetalert2';
import { ReplayComponent } from './replay/replay.component';

export interface ContactUs {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  subject: string;
  message: string;
  replay_subject: string;
  insert_date: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactData: ContactUs[] = []; // Holds table data
  displayedColumns: string[] = [
    'id',
    'name',
    'phone_number',
    'email',
    'subject',
    'message',
    'insert_date',
    'actions',
  ];

  constructor(
    private contactService: ContactUsService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    await this.getData(); // Fetch contact data on load
  }
  replyToMessage(element: any): void {
    const dialogRef = this.dialog.open(ReplayComponent, {
      width: '600px', // Adjust as needed
      data: element,  // Pass contact details
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Reply Sent:", result);
        //this.sendReply(contact.id, result);
      }
    });
  }

  getData() {
    this.contactService.getContactUs().subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 200) {
          this.contactData = res.data.items; // Load data into table
          this.cdr.detectChanges();
        }
        else {
          console.error('Error fetching contact data:', res.message);
        }
      },
      error: (error) => {
        console.error('Error fetching contact data:', error);
      },
    });
  }

  openDialog(contact?: ContactUs) {
    this.dialog.open(ViewContactComponent, {
      width: '1000px', // Adjust width
      data: contact, // Pass contact details
    });
  }

  deleteContact(contactId: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.DeleteContactUs(contactId).subscribe({
        next: () => {
          this.getData(); // Refresh table after deletion
        },
        error: (error) => {
          console.error('Error deleting contact:', error);
        },
      });
    }
  }
}
