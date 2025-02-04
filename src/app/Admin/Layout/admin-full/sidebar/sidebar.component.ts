import { Component } from '@angular/core';
import { NavService } from '../../../../Services/Admin/nav.service';
import { NavItem } from './NavItem/nav-items';
import { navItemsAllUser } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  navItems: NavItem[] = [];

  constructor(public navService: NavService) { }

  async ngOnInit(): Promise<void> {
    await this.getNavItem();
  }
  getNavItem() {
    this.navItems = navItemsAllUser;
    // navItemsAllUser.forEach((item, index) => {

    //   if (index === 0) return; // Skip the first item
    //   permssions.forEach((permssion) => {
    //     if (item.subtext == permssion) {
    //       this.navItems.push(item);
    //     }

    //   });

    // });

  }
  logout() {

  }
}
