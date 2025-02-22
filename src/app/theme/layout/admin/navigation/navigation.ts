import { Injectable } from '@angular/core';
import {ApiService} from "../../../../services/api.service";
export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

//Admin navigation
const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        permission:"DASHBOARD",
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
        //roles: ['ADMINISTRATOR', 'AUTHORIZER', 'APPROVER', 'REVIEWER', 'BILLER']
      },
      {
        id: 'dashboard-lga',
        permission:"LGA_CHAIR_DASHBOARD",
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard-lga',
        icon: 'feather icon-home',
        classes: 'nav-item',
      }  ,
      {
        id: 'lga-outstanding-bills',
        permission:"LGA_CHAIR_DASHBOARD",
        title: 'Outstanding Bills',
        type: 'item',
        url: '/lga-outstanding-bills',
        icon: 'feather icon-align-justify',
        classes: 'nav-item',
      }  ,
      {
        id: 'lga-payments',
        permission:"LGA_CHAIR_DASHBOARD",
        title: 'Payments',
        type: 'item',
        url: '/lga-payments',
        icon: 'feather icon-file',
        classes: 'nav-item',
      }  ,

      {
        id: 'lga-logout',
        permission:"LGA_LOGOUT",
        title: 'Logout',
        type: 'item',
        url: '/dashboard-logout',
        icon: 'feather icon-log-out',
        classes: 'nav-item',
      }
    ]
  },
  {
    id: 'ui-settings',
    title: 'General Settings',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'settings',
        title: 'Settings',
        type: 'collapse',
        icon: 'feather icon-settings',
        roles: ['ADMINISTRATOR', 'AUTHORIZER', 'APPROVER', 'REVIEWER', 'BILLER'],
        children: [
          {
            id: 'system-users',
            title: 'System Users',
            type: 'item',
            url: '/settings/system-users',
            roles: ['ADMINISTRATOR'],
            permission:"USER_ACCOUNT",
          },
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: '/settings/roles',
            roles: ['ADMINISTRATOR'],
            permission:"USER_ACCOUNT",
          },
          {
            id: 'permissions',
            title: 'Permissions',
            type: 'item',
            url: '/settings/permissions',
            roles: ['ADMINISTRATOR'],
            permission:"USER_ACCOUNT",
          },
          {
            id: 'assign-permission',
            title: 'Assign Permissions',
            type: 'item',
            url: '/settings/roles-permissions',
            roles: ['ADMINISTRATOR'],
            permission:"USER_ACCOUNT",
          },
          {
            id: 'lga',
            title: 'LGA',
            type: 'item',
            url: '/settings/lgas',
            roles: ['ADMINISTRATOR', 'AUTHORIZER', 'APPROVER', 'REVIEWER', 'BILLER'],
            permission:"HOUSE_KEEPING",
          },
          {
            id: 'zones',
            title: 'Zones',
            type: 'item',
            url: '/settings/zones',
            roles: ['ADMINISTRATOR', 'AUTHORIZER', 'APPROVER', 'REVIEWER', 'BILLER'],
            permission:"HOUSE_KEEPING",
          },
          {
            id: 'relief',
            title: 'Relief',
            type: 'item',
            url: '/settings/relief',
            roles: ['ADMINISTRATOR', 'AUTHORIZER', 'APPROVER', 'BILLER'],
            permission:"HOUSE_KEEPING",
          },
          {
            id: 'property-title',
            title: 'Property Title',
            type: 'item',
            url: '/settings/property-title',
            roles: ['ADMINISTRATOR', 'AUTHORIZER', 'APPROVER', 'REVIEWER', 'BILLER'],
            permission:"HOUSE_KEEPING",
          },
          {
            id: 'area-office',
            title: 'Area Office',
            type: 'item',
            url: '/settings/area-office',
            roles: ['ADMINISTRATOR'],
            permission:"HOUSE_KEEPING",
          },
          {
            id: 'property-classification',
            title: 'Prop. Classification',
            type: 'item',
            url: '/settings/property-classification',
            roles: ['ADMINISTRATOR','REVIEWER',],
            permission:"HOUSE_KEEPING",
          },
          {
            id: 'property-assessment-value',
            title: 'Billing Setup',
            type: 'item',
            url: '/settings/property-assessment-value',
            roles: ['ADMINISTRATOR', 'REVIEWER', 'BILLER'],
            permission:"BILLING_SETUP",
          },
          {
            id: 'depreciation',
            title: 'Depreciation',
            type: 'item',
            url: '/settings/depreciation',
            roles: [ 'BILLER'],
            permission:"BILLING_SETUP",
          },
          {
            id: 'charge-rate',
            title: 'Charge Rate',
            type: 'item',
            url: '/settings/charge-rate',
            permission:"BILLING_SETUP",
          },
          {
            id: 'minimum-luc',
            title: 'Minimum LUC',
            type: 'item',
            url: '/settings/minimum-luc',
            permission:"MINIMUM_LUC",
          },

        ]
      }
    ]
  },
  {
    id: 'owner-management',
    title: 'Management',
    type: 'group',
    icon: 'icon-users',
    children: [
      {
        id: 'property-management',
        title: 'Property Management',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'owners',
            title: 'Owners',
            type: 'item',
            url: '/owner-management/owners',
            permission:"MANAGE_PROPERTY",
          },
          {
            id: 'property-list',
            title: 'Property List',
            type: 'item',
            url: '/owner-management/property-list',
            permission:"MANAGE_PROPERTY",
          },
        ]
      }
    ]
  },
  {
    id: 'synchronization',
    title: 'Billing',
    type: 'group',
    icon: 'icon-bookmark',

    children: [
      {
        id: 'system-sync',
        title: 'Sync',
        type: 'collapse',
        icon: 'feather icon-refresh-ccw',
        children: [
          {
            id: 'synchronization',
            title: 'Synchronization',
            type: 'item',
            url: '/billings/synchronization',
            permission:"PROPERTY_SYNC",
          },
          {
            id: 'exception',
            title: 'Property Exceptions',
            type: 'item',
            url: '/billings/property-exceptions',
            permission:"PROPERTY_SYNC",
          },
        ]
      },

      {
        id: 'billing-system',
        title: 'Process Bill',
        type: 'collapse',
        icon: 'feather icon-server',
        children: [
          {
            id: 'process',
            title: 'Process Bill',
            type: 'item',
            url: '/billings/process',
            roles: ['ADMINISTRATOR', 'REVIEWER', 'BILLER'],
            permission:"PROCESS_BILLING",
          },
          {
            id: 'all-bills',
            title: 'All Pending Bills',
            type: 'item',
            url: '/billings/all-pending-bills',
            permission:"ALL_PENDING_BILLS",
          },
        ]
      },
      {
        id: 'normal-bills',
        title: 'Normal Bills',
        type: 'collapse',
        icon: 'feather icon-bookmark',
        children: [
          {
            id: 'return-bills',
            title: 'Returned Bills',
            type: 'item',
            url: '/billings/returned-bills',
            permission:"RETURNED_BILL",
          },

          {
            id: 'review',
            title: 'Review',
            type: 'item',
            url: '/billings/review',
            permission:"NORMAL_BILL_REVIEW",
          },
          {
            id: 'verify',
            title: 'Verify',
            type: 'item',
            url: '/billings/verify',
            permission:"NORMAL_BILL_VERIFY",
          },
          {
            id: 'authorize',
            title: 'Authorize',
            type: 'item',
            url: '/billings/authorize',
            permission:"NORMAL_BILL_AUTHORIZE",
          },
          {
            id: 'approve',
            title: 'Approve',
            type: 'item',
            url: '/billings/approve',
            permission:"NORMAL_BILL_APPROVE",
          },
          {
            id: 'outstanding',
            title: 'Outstanding Bills',
            type: 'item',
            url: '/billings/outstanding',
            permission:"NORMAL_OUTSTANDING_BILL",
          },
          {
            id: 'paid',
            title: 'Paid Bills',
            type: 'item',
            url: '/billings/paid',
            permission:"NORMAL_PAID_BILLS",
          },
        ]
      },
      {
        id: 'special-interest',
        title: 'Special Interest Bills',
        type: 'collapse',
        icon: 'feather icon-eye',
        children: [
          {
            id: 'si-return-bills',
            title: 'Returned Bills',
            type: 'item',
            url: '/billings/returned-special-interest-bills',
            permission:"RETURNED_SI_BILLS",
          },
          {
            id: 'si-review',
            title: 'SI Review Bills',
            type: 'item',
            url: '/billings/review-special-interest-bills',
            permission:"SI_REVIEW_BILLS",
          },
          {
            id: 'si-verify',
            title: 'Verify',
            type: 'item',
            url: '/billings/special-interest/verify',
            permission:"SI_BILL_VERIFY",
          },
          {
            id: 'si-authorize',
            title: 'Authorize',
            type: 'item',
            url: '/billings/special-interest/authorize',
            permission:"SI_BILL_AUTHORIZE",
          },
          {
            id: 'si-approve',
            title: 'Approve',
            type: 'item',
            url: '/billings/special-interest/approve',
            permission:"SI_BILL_APPROVE",
          },
          {
            id: 'si-outstanding-bills',
            title: 'SI Outstanding Bills',
            type: 'item',
            url: '/billings/special-interest/outstanding',
            permission:"SI_OUTSTANDING_BILL",
          },
          {
            id: 'si-paid',
            title: 'SI Paid Bills',
            type: 'item',
            url: '/billings/paid-special-interest-bills',
            permission:"SI_PAID_BILLS",
          },

        ]
      }
    ]
  },


  {
    id: 'objection',
    title: 'Objection',
    type: 'group',
    icon: 'icon-bookmark',
    children: [
      {
        id: 'objection-system',
        title: 'Objection',
        type: 'collapse',
        icon: 'feather icon-help-circle',
        children: [
          {
            id: 'requests',
            title: 'Requests',
            type: 'item',
            url: '/objections/requests',
            permission:"OBJECTION_REQUEST",
          },
          {
            id: 'verification',
            title: 'Verification',
            type: 'item',
            url: '/objections/verification',
            permission:"OBJECTION_VERIFY",
          },
          {
            id: 'authorization',
            title: 'Authorization',
            type: 'item',
            url: '/objections/authorization',
            permission:"OBJECTION_AUTHORIZE",
          },
          {
            id: 'approval',
            title: 'Approval',
            type: 'item',
            url: '/objections/approval',
            permission:"OBJECTION_APPROVE",
          },
          {
            id: 'objected',
            title: 'Objected Bills',
            type: 'item',
            url: '/billings/objected',
            permission:"OBJECTED_BILLS",
          },
        ]
      }
    ]
  },
  {
    id: 'report',
    title: 'Report',
    type: 'group',
    icon: 'icon-chart',
    children: [
      {
        id: 'report-system',
        title: 'Report',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'payment',
            title: 'Payments',
            type: 'item',
            url: '#',
            permission:"REPORT_PAYMENTS",
          },
          {
            id: 'statement',
            title: 'Statements',
            type: 'item',
            url: '#',
            permission:"REPORT_STATEMENTS",
          },
          {
            id: 'report-property-list',
            title: 'Property List',
            type: 'item',
            url: '#',
            permission:"REPORT_PROPERTY_LIST",
          },
          {
            id: 'report-property-exception',
            title: 'Property Exception',
            type: 'item',
            url: '#',
            permission:"REPORT_PROPERTY_EXCEPTION",
          },
          {
            id: 'report-objected-bills',
            title: 'Objected Bills',
            type: 'item',
            url: '#',
            permission:"REPORT_OBJECTED_BILLS",
          },
        ]
      }
    ]
  },

];


@Injectable()
export class NavigationItem {
  constructor(
    private apiService: ApiService) {
  }
  get() {
    let permissions = this.apiService.getItem('permissions');
    const permissionArray = permissions.split(',');

    let role = this.apiService.getItem('role');

    //console.log(permissionArray)

    return  NavigationItems
      .map(group => ({
        ...group,
        children: group.children
          .map(child => ({
            ...child,
            children: child.children ? child.children.filter(item => permissionArray.includes(item.permission)) : undefined
          }))
          .filter(child => permissionArray.includes(child.permission) || (child.children && child.children.length))
      }))
      .filter(group => group.children.length);
    /*NavigationItems
      .map(group => ({
        ...group,
        children: group.children
          ?.map(item => ({
            ...item,
            children: item.children
              ? item.children.filter(child => !child.roles || child.roles.includes(role))
              : undefined
          }))
          .filter(item => !item.roles || item.roles.includes(role))
      }))
      .filter(group => group.children && group.children.length > 0);*/


  }


  filterNavigationItems(navigationItems: any[], userRole: string): any[] {
    return navigationItems
      .map(group => ({
        ...group,
        children: group.children
          ?.map(item => ({
            ...item,
            children: item.children
              ? item.children.filter(child => !child.roles || child.roles.includes(userRole))
              : undefined
          }))
          .filter(item => !item.roles || item.roles.includes(userRole))
      }))
      .filter(group => group.children && group.children.length > 0);
  }

   filterNavigationByPermission = (navigationItems, userPermissions) => {
    return navigationItems
      .map(group => ({
        ...group,
        children: group.children
          .map(child => ({
            ...child,
            children: child.children ? child.children.filter(item => userPermissions.includes(item.permission)) : undefined
          }))
          .filter(child => userPermissions.includes(child.permission) || (child.children && child.children.length))
      }))
      .filter(group => group.children.length);
  };
}
