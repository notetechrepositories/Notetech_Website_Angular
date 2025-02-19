import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SettingsService } from '../../../Services/User/settings.service';
import { FooterData } from '../../Layout/full/full.component';

export interface AboutUs {
  light_title: string;
  home_title: string;
  home_sub_title: string;
  home_description: string;
  page_title: string | null;
  page_sub_title: string | null;
  page_description: string | null;
  sub_title: string | null;
  title: string | null;
  description: string | null;
  page_background_image: string | null;
  description_image: string | null;
}

export interface PagesModel {
  id?: string;
  light_title?: string;
  home_title: string;
  home_sub_title?: string;
  home_description: string;
  page_title?: string;
  page_sub_title?: string;
  page_description?: string;
  sub_title?: string;
  title?: string;
  description?: string;
  page_background_image?: string;
  description_image?: string;
  slug?: string;
  priority?: number;
}

export interface PageContentModel {
  page_id?: string;
  home_content_title?: string;
  home_content_description?: string;
  home_image?: string;
  read_more?: number;
  page_slug?: string;
}

export interface PageDetailsContentModel extends PagesModel {
  pagesModels?: PageContentModel[]; // Optional array
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  glowIntensity: number = 1;
  startCounter = false; // Flag to activate the counter
  aboutUs!: PagesModel;
  pageDetailsContentModel: PageDetailsContentModel[] = [];
  // PageDetailsContentModel objects initialization
  // Initialize with required fields
  pageDetailsContentOneModel: PageDetailsContentModel = {
    id: '',
    slug: '',
    title: '',
    description: '',
    priority: 0,
    home_title: '',         // Required field
    home_description: '',   // Required field
    pagesModels: []         // Empty array to match the expected structure
  };

  pageDetailsContentTwoModel: PageDetailsContentModel = {
    id: '',
    slug: '',
    title: '',
    description: '',
    priority: 0,
    home_title: '',         // Required field
    home_description: '',   // Required field
    pagesModels: []         // Empty array to match the expected structure
  };


  homePageTestimonial = {
    title: `We <span style="color:#006cb6 ">Excel</span> In`,
    subTitle: "TESTIMONIALS",
  };

  safeServiceTitle!: SafeHtml;
  safeTestimonialTitle!: SafeHtml;
  footerData!: FooterData;
  safeMapAddress!: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private settings: SettingsService) {


  }
  async ngOnInit() {
    await this.getSettings()

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
      { icon: "fas fa-dharmachakra", title: "Software Development", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry2." },
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
  getSettings() {


    this.settings.getContent().subscribe({
      next: (res) => {
        if (res.status == 200) {

          this.footerData = res.data.settings;
          this.pageDetailsContentModel = res.data.pageContent;

          const aboutUsPage = this.pageDetailsContentModel.find(
            (page: PageDetailsContentModel) => page.slug === 'about-us'
          );
          const sortedPages = this.pageDetailsContentModel
            .filter((page: PageDetailsContentModel) => page.slug !== 'about-us')
            .sort((a, b) => (a.priority || 0) - (b.priority || 0)); // Sorting by priority, ensure default value if undefined


          if (sortedPages) {
            this.pageDetailsContentOneModel = sortedPages[0];
            this.pageDetailsContentTwoModel = sortedPages[1];
            this.safeServiceTitle = this.sanitizer.bypassSecurityTrustHtml(this.pageDetailsContentOneModel.home_title);
            this.safeTestimonialTitle = this.sanitizer.bypassSecurityTrustHtml(this.pageDetailsContentTwoModel.home_title);
          }




          console.log(this.pageDetailsContentOneModel);
          console.log(this.pageDetailsContentTwoModel);

          if (aboutUsPage) {
            this.aboutUs = aboutUsPage;
          }

          if (this.footerData && this.footerData.map_address) {
            console.log(this.footerData.map_address);

            this.safeMapAddress = this.sanitizer.bypassSecurityTrustHtml(this.footerData.map_address);
          }

        } else {
          // this.showError(res.message);
        }
      },
      error: (error) => {
        // this.showError('Something went wrong. Please try again.');

      }
    });
  }

}
