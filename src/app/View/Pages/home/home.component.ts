import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  glowIntensity: number = 1;
  startCounter = false; // Flag to activate the counter



  homePageTestimonial = {
    title: `We <span style="color:#006cb6 ">Excel</span> In`,
    subTitle: "TESTIMONIALS",
  };

  safeServiceTitle: SafeHtml;
  safeTestimonialTitle: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.safeServiceTitle = this.sanitizer.bypassSecurityTrustHtml(this.homePageService.title);
    this.safeTestimonialTitle = this.sanitizer.bypassSecurityTrustHtml(this.homePageTestimonial.title);
  }
  homePageAboutUs = {
    subTitle: "GET TO KNOW US",
    title: "Empowering Your Digital Growth with Offshore",
    subDescription: "IT Solutions",
    description: "With 26+ years of expertise, Notetech is a leader in offshore software development, delivering high-quality IT solutions to clients in the USA, UK, and Europe. Our dedicated teams help reduce operational costs and enhance efficiency with cutting-edge technology and a commitment to excellence."
  }

  homePageService = {
    title: `What We <span style="color:#006cb6 ">Offer</span>`,
    subTitle: "OUR SERVICES",
    service: [
      { icon: "fas fa-pen-fancy", title: "Project Creation", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      { icon: "fas fa-dharmachakra", title: "Software Development", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      { icon: "fas fa-tasks", title: "Project Management", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      { icon: "fas fa-tachometer-alt", title: "Project Implementation", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      { icon: "fas fa-recycle", title: "Software Update", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      { icon: "fas fa-headset", title: "24/7 Support", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." }
    ]
  }



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
