import { NavItem } from "./NavItem/nav-items";


export const navItemsAllUser: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    subtext: 'dashboard',
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    subtext: 'leave',
    displayName: 'Leave',
    iconName: 'message-share',
    route: '/extra/leave',
  },
  {
    subtext: 'epf',
    displayName: 'EPF',
    iconName: 'pig-money',
    route: '/extra/epf',
  },
  {
    subtext: 'employee',
    displayName: 'Employee Details',
    iconName: 'users',
    route: '/extra/employee',
  },
];

