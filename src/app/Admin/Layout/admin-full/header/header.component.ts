import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: any;

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  isCheckedIn: boolean = true; // Set dynamically
  showFiller = false;

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    // Simulating fetching user data
    this.user = {
      name: 'John Doe',
      profilePic: './assets/images/user-5.png',
    };
  }
}
