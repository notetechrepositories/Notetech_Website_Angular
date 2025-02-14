import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent {
  isMenuOpen = false;
  isScrolled = false;
  footerData = {
    whatsapp: "https://wa.me/919895046902",
    facebook: "https://www.facebook.com",
    twitter: "https://twitter.com/Notetech_IT",
    github: "",
    linkedin: "https://www.linkedin.com/company/notetech-software/",
    instagram: "https://www.instagram.com/notetechsoftware/",
    skype: "https://join.skype.com/invite/xXRXvR3Qpoyo",
    copyRights: "2025 Notetech Software.All rights reserved.",
    companyName: "Notetech Software",
    footerDescription: "Creating beautiful digital experiences with modern design solutions for forward - thinking companies."
  }

  headerData = {
    headerlogo: "assets/images/notetech-logo-light.png"
  }
  constructor(private renderer: Renderer2) { }

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
