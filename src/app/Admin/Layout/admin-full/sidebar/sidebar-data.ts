import { NavItem } from "./NavItem/nav-items";


export const navItemsAllUser: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    subtext: 'dashboard',
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/admin/dashboard', // ✅ Ensure correct admin route
  },
  {
    subtext: 'contact-us',
    displayName: 'Contact Us',
    iconName: 'layout-dashboard',
    route: '/admin/contact-us', // ✅ Fix route to match routing configuration
  }
];


