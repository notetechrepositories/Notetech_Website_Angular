import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  async ngOnInit(): Promise<void> {
    await this.getUserData();
  }
  constructor(
    private router: Router,

  ) { }
  getUserData() {
    // Simulating fetching user data
    this.user = {
      name: 'John Doe',
      profilePic: './assets/images/user-5.png',
    };
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/authentication/login']);
  }
}
