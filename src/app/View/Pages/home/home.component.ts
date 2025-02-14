import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  glowIntensity: number = 1;
  startCounter = false; // Flag to activate the counter
  @ViewChild('counterElement', { static: false }) counterElement!: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = 300; 
    this.glowIntensity = Math.max(0, 1 - scrollTop / maxScroll); 
  }

  getGlowStyle(): string {
    const intensity = this.glowIntensity; 
    return `
      0 0 ${7 * intensity}px #05f1f9,
      0 0 ${10 * intensity}px #05f1f9,
      0 0 ${21 * intensity}px #05f1f9,
      0 0 ${42 * intensity}px #0a75bd,
      0 0 ${82 * intensity}px #0a75bd,
      0 0 ${92 * intensity}px #0a75bd,
      0 0 ${102 * intensity}px #0a75bd,
      0 0 ${151 * intensity}px #0a75bd
    `;
  }



  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startCounter = true; // Start the counter when visible
          observer.unobserve(entry.target); // Stop observing after triggering
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    observer.observe(this.counterElement.nativeElement);
  }

  //==================================================================

  activeLocation: string | null = null;
  isMobile: boolean = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  showLocationInfo(location: string) {
    if (!this.isMobile) {
      this.activeLocation = location;
    }
  }

  hideLocationInfo(location: string) {
    if (!this.isMobile) {
      if (this.activeLocation === location) {
        this.activeLocation = null;
      }
    }
  }

  toggleLocationInfo(location: string) {
    if (this.isMobile) {
      this.activeLocation = this.activeLocation === location ? null : location;
    }
  }
  redirectToMap(url: string) {
    window.open(url, '_blank'); // Open Google Maps in a new tab
  }


}
