import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SettingsService } from '../../../Services/User/settings.service';
import { environment } from '../../../environment';
import { Router } from '@angular/router';
export interface MenuData {
  id: string;
  menu_name: string;
  parent_id: number;
  page_id: string;
  is_active: number;
  is_delete: number;
  priority: number;
  slug: string;
  children: MenuData[];
}

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
  menuData: MenuData[] = [];
  isLoading = true; // New loading flag

  constructor(private renderer: Renderer2, private sttings: SettingsService, private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSettings(); // Wait for data before rendering
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100; // Change threshold as needed
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // if (this.isMenuOpen) {
    //   // Disable scrolling
    //   this.renderer.setStyle(document.body, 'overflow', 'hidden');
    // } else {
    //   // Enable scrolling
    //   this.renderer.removeStyle(document.body, 'overflow');
    // }
  }
  async getSettings(): Promise<void> {
    this.sttings.getHeaderAndFooter().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.footerData = res.data.items;
          this.menuData = res.data.menu.filter((item: MenuData) => item.is_active === 1 && item.is_delete === 0);


          this.menuData = res.data.menu
            .filter((item: MenuData) => item.is_active === 1 && item.is_delete === 0)
            .sort((a: MenuData, b: MenuData) => a.priority - b.priority); // Correct sorting syntax

          this.menuData = this.buildMenuTree(this.menuData)
            .map(menu => ({
              ...menu,
              children: menu.children.sort((a, b) => a.priority - b.priority) ?? [] // Sort children by priority
            }));


          this.footerData.header_logo = environment.baseUrlWithOutApiString + this.footerData.header_logo;
          this.isLoading = false; // Set to false when data is loaded
        } else {
          this.isLoading = false;
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
  buildMenuTree(menuList: MenuData[], parentId: number | null = 0): MenuData[] {
    return menuList
      .filter(item => item.parent_id === parentId)
      .map(item => ({
        ...item,
        children: this.buildMenuTree(menuList, +item.id) || [] // Ensure children is an array
      }));
  }
  redirectMenu(event: Event, menu: MenuData) {
    event.preventDefault(); // Prevent default behavior of <a> tag

    if (menu.slug === "pages-row" && menu.page_id) {
      this.router.navigate(['/pages-row', menu.page_id]);

    } else if (menu.slug === "pages-grid" && menu.page_id) {
      this.router.navigate(['/pages-grid', menu.page_id]);

    } else if (menu.slug) {
      this.router.navigate(['/', menu.slug]); // Navigate normally
    } else {
      console.log('No valid slug or page_id for navigation:', menu);
    }
  }

}

