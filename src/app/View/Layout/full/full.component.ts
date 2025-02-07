import { Component, HostListener,Renderer2  } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent {
  isMenuOpen = false;
  isScrolled = false;

  constructor(private renderer: Renderer2){}

    @HostListener('window:scroll', [])
    onWindowScroll() {
      this.isScrolled = window.scrollY > 100; // Change threshold as needed
    }
  
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
  
      if (this.isMenuOpen) {
        // Disable scrolling
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
      } else {
        // Enable scrolling
        this.renderer.removeStyle(document.body, 'overflow');
      }
    }
}
