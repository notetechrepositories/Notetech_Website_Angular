import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent {
  isMenuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Change threshold as needed
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
