import { Injectable } from '@angular/core';

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

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
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
        children: [
          {
            id: 'lga',
            title: 'LGA',
            type: 'item',
            url: '/settings/lgas'
          },
          {
            id: 'zones',
            title: 'Zones',
            type: 'item',
            url: '/settings/zones'
          },
          {
            id: 'relief',
            title: 'Relief',
            type: 'item',
            url: '/settings/relief'
          },
          {
            id: 'property-title',
            title: 'Property Title',
            type: 'item',
            url: '/settings/property-title'
          },
          {
            id: 'area-office',
            title: 'Area Office',
            type: 'item',
            url: '/settings/area-office'
          },
          {
            id: 'property-classification',
            title: 'Prop. Classification',
            type: 'item',
            url: '/settings/property-classification'
          },
          {
            id: 'property-assessment-value',
            title: 'Prop. Assess. Value(PAV)',
            type: 'item',
            url: '/settings/property-assessment-value'
          }
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
        id: 'owner-management',
        title: 'Owner Management',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'owners',
            title: 'Owners',
            type: 'item',
            url: '/owner-management/owners'
          },
          {
            id: 'property-list',
            title: 'Property List',
            type: 'item',
            url: '/owner-management/property-list'
          },
        ]
      }
    ]
  },
  {
    id: 'bills',
    //title: 'Bills',
    type: 'group',
    icon: 'icon-bookmark',

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
            url: '/billings/synchronization'
          },
          {
            id: 'exception',
            title: 'Property Exceptions',
            type: 'item',
            url: '#'
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
            url: '/billings/process'
          },
          {
            id: 'verify',
            title: 'Verify',
            type: 'item',
            url: '/billings/verify'
          },
          {
            id: 'authorize',
            title: 'Authorize',
            type: 'item',
            url: '/billings/authorize'
          },
          {
            id: 'approve',
            title: 'Approve',
            type: 'item',
            url: '/billings/approve'
          },
          {
            id: 'outstanding',
            title: 'Outstanding Bills',
            type: 'item',
            url: '/billings/outstanding'
          },
          {
            id: 'paid',
            title: 'Paid Bills',
            type: 'item',
            url: '/billings/paid'
          },
        ]

        /*children: [

          {
            id: 'outstanding',
            title: 'Outstanding Bills',
            type: 'item',
            url: '/billings/outstanding'
          },
          {
            id: 'paid',
            title: 'Paid Bills',
            type: 'item',
            url: '/billings/paid'
          },
        ]*/
      }
    ]
  },
  /*
  {
    id: 'billing',
    title: 'Billing',
    type: 'group',
    icon: 'icon-bookmark',

    children: [
      {
        id: 'bills-system',
        title: 'Bills',
        type: 'collapse',
        icon: 'feather icon-tag',
        children: [
          {
            id: 'pending-bills',
            title: 'Pending',
            type: 'item',
            url: '/billings/pending'
          },
          {
            id: 'verify',
            title: 'Verify',
            type: 'item',
            url: '/billings/verify'
          },
          {
            id: 'authorize',
            title: 'Authorize',
            type: 'item',
            url: '/billings/authorize'
          },
          {
            id: 'approve',
            title: 'Approve',
            type: 'item',
            url: '/billings/approve'
          },
          {
            id: 'objected',
            title: 'Objected Bills',
            type: 'item',
            url: '/billings/objected'
          },
        ]
      },
      {
        id: 'billing-system',
        title: 'Billing',
        type: 'collapse',
        icon: 'feather icon-bookmark',
        children: [
          {
            id: 'synchronization',
            title: 'Synchronization',
            type: 'item',
            url: '/billings/synchronization'
          },
          {
            id: 'process',
            title: 'Process Bill',
            type: 'item',
            url: '/billings/process'
          },
          {
            id: 'outstanding',
            title: 'Outstanding Bills',
            type: 'item',
            url: '/billings/outstanding'
          },
          {
            id: 'paid',
            title: 'Paid Bills',
            type: 'item',
            url: '/billings/paid'
          },
        ]
      }
    ]
  },*/

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
            url: '/objections/requests'
          },
          {
            id: 'verification',
            title: 'Verification',
            type: 'item',
            url: '/objections/verification'
          },
          {
            id: 'authorization',
            title: 'Authorization',
            type: 'item',
            url: '/objections/authorization'
          },
          {
            id: 'approval',
            title: 'Approval',
            type: 'item',
            url: '/objections/approval'
          },
          {
            id: 'objected',
            title: 'Objected Bills',
            type: 'item',
            url: '/billings/objected'
          },
        ]
      }
    ]
  },
  /*
  {
    id: 'ui-element',
    title: 'UI ELEMENT',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography'
          }
        ]
      }
    ]
  },
 /* {
    id: 'forms',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms-element',
        title: 'Form Elements',
        type: 'item',
        url: '/forms/basic',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        url: '/tables/bootstrap',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  },
  {
    id: 'chart-maps',
    title: 'Chart',
    type: 'group',
    icon: 'icon-charts',
    children: [
      {
        id: 'apexChart',
        title: 'ApexChart',
        type: 'item',
        url: 'apexchart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true
      },
      {
        id: 'buy_now',
        title: 'Buy Now',
        type: 'item',
        icon: 'feather icon-book',
        classes: 'nav-item',
        url: 'https://codedthemes.com/item/datta-able-angular/',
        target: true,
        external: true
      }
    ]
  } */
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
