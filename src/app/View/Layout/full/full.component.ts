import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SettingsService } from '../../../Services/User/settings.service';
import { environment } from '../../../environment';
export interface FooterData {
  id: string;
  header_logo: string;
  office_name: string;
  footer_description: string;
  map_address: string;
  home_titile: string;
  home_sub_titile: string;
  updated_by: string;
  updated_at: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  github: string;
  linkedin: string;
  instagram: string;
  skype: string;
  copy_rights: string;
  google_map: string;
}
@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;
  footerData!: FooterData;



  headerData = {
    headerlogo: "assets/images/notetech-logo-light.png"
  }
  constructor(private renderer: Renderer2, private sttings: SettingsService) { }
  async ngOnInit() {
    await this.getSettings()
  }

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
  getSettings() {


    this.sttings.getHeaderAndFooter().subscribe({
      next: (res) => {
        if (res.status == 200) {


          this.footerData = res.data.items;

          this.footerData.header_logo = environment.baseUrlWithOutApiString + this.footerData.header_logo;


          console.log(this.footerData.header_logo);


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
