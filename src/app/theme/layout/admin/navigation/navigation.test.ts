import { Injectable } from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {RbacService} from "../../../../services/rbac.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../../services/common.service";
import {MessageService} from "primeng/api";
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
            id: 'system-users',
            title: 'System Users',
            type: 'item',
            url: '/settings/system-users'
          },
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
            title: 'Billing Setup',
            type: 'item',
            url: '/settings/property-assessment-value'
          },
          {
            id: 'depreciation',
            title: 'Depreciation',
            type: 'item',
            url: '/settings/depreciation'
          },
          {
            id: 'charge-rate',
            title: 'Charge Rate',
            type: 'item',
            url: '/settings/charge-rate'
          },
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: '/settings/roles'
          },
          {
            id: 'permissions',
            title: 'Permissions',
            type: 'item',
            url: '/settings/permissions'
          },
          {
            id: 'assign-permission',
            title: 'Assign Permissions',
            type: 'item',
            url: '/settings/roles-permissions'
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
            url: '/billings/property-exceptions'
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
            id: 'all-bills',
            title: 'All Pending Bills',
            type: 'item',
            url: '/billings/all-pending-bills'
          },
          {
            id: 'return-bills',
            title: 'Returned Bills',
            type: 'item',
            url: '/billings/returned-bills'
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
      },
      /*

       */
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
            url: '/billings/returned-special-interest-bills'
          },
          {
            id: 'si-verify',
            title: 'Verify',
            type: 'item',
            url: '/billings/special-interest/verify'
          },
          {
            id: 'si-authorize',
            title: 'Authorize',
            type: 'item',
            url: '/billings/special-interest/authorize'
          },
          {
            id: 'si-approve',
            title: 'Approve',
            type: 'item',
            url: '/billings/special-interest/approve'
          },
          {
            id: 'si-outstanding-bills',
            title: 'SI Outstanding Bills',
            type: 'item',
            url: '/billings/special-interest/outstanding'
          },
          {
            id: 'paid',
            title: 'SI Paid Bills',
            type: 'item',
            url: '/billings/paid'
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
            url: '#'
          },
          {
            id: 'statement',
            title: 'Statements',
            type: 'item',
            url: '#'
          },
          {
            id: 'report-property-list',
            title: 'Property List',
            type: 'item',
            url: '#'
          },
          {
            id: 'report-property-exception',
            title: 'Property Exception',
            type: 'item',
            url: '#'
          },
          {
            id: 'report-objected-bills',
            title: 'Objected Bills',
            type: 'item',
            url: '#'
          },
        ]
      }
    ]
  },

];

const BillerNavigationItems = [
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
            id: 'all-bills',
            title: 'All Pending Bills',
            type: 'item',
            url: '/billings/all-pending-bills'
          },
          {
            id: 'return-bills',
            title: 'Returned Bills',
            type: 'item',
            url: '/billings/returned-bills'
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
            url: '/billings/returned-special-interest-bills'
          },
          {
            id: 'si-verify',
            title: 'Verify',
            type: 'item',
            url: '/billings/special-interest/verify'
          },
          {
            id: 'si-authorize',
            title: 'Authorize',
            type: 'item',
            url: '/billings/special-interest/authorize'
          },
          {
            id: 'si-approve',
            title: 'Approve',
            type: 'item',
            url: '/billings/special-interest/approve'
          },
          {
            id: 'si-outstanding-bills',
            title: 'SI Outstanding Bills',
            type: 'item',
            url: '/billings/special-interest/outstanding'
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


];

const MANAGE_PROPERTY_ITEMS = [

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
            id: 'all-bills',
            title: 'All Pending Bills',
            type: 'item',
            url: '/billings/all-pending-bills'
          },
          {
            id: 'return-bills',
            title: 'Returned Bills',
            type: 'item',
            url: '/billings/returned-bills'
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
            url: '/billings/returned-special-interest-bills'
          },
          {
            id: 'si-verify',
            title: 'Verify',
            type: 'item',
            url: '/billings/special-interest/verify'
          },
          {
            id: 'si-authorize',
            title: 'Authorize',
            type: 'item',
            url: '/billings/special-interest/authorize'
          },
          {
            id: 'si-approve',
            title: 'Approve',
            type: 'item',
            url: '/billings/special-interest/approve'
          },
          {
            id: 'si-outstanding-bills',
            title: 'SI Outstanding Bills',
            type: 'item',
            url: '/billings/special-interest/outstanding'
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

];

const HOUSE_KEEPING_ITEMS = [
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

        ]
      }
    ]
  }

];
const BILLING_SETUP_ITEMS = [
  {
    id: 'property-assessment-value',
    title: 'Billing Setup',
    type: 'item',
    url: '/settings/property-assessment-value'
  },
  {
    id: 'depreciation',
    title: 'Depreciation',
    type: 'item',
    url: '/settings/depreciation'
  },
  {
    id: 'charge-rate',
    title: 'Charge Rate',
    type: 'item',
    url: '/settings/charge-rate'
  },

]

const USER_ACCOUNT_ITEMS = [

  {
    id: 'system-users',
    title: 'System Users',
    type: 'item',
    url: '/settings/system-users'
  },
  {
    id: 'roles',
    title: 'Roles',
    type: 'item',
    url: '/settings/roles'
  },
  {
    id: 'permissions',
    title: 'Permissions',
    type: 'item',
    url: '/settings/permissions'
  },
  {
    id: 'assign-permission',
    title: 'Assign Permissions',
    type: 'item',
    url: '/settings/roles-permissions'
  },

]

const PROCESS_BILL_ITEMS = [
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
        id: 'all-bills',
        title: 'All Pending Bills',
        type: 'item',
        url: '/billings/all-pending-bills'
      },
    ]
  }
];

const RETURNED_BILL_ITEMS = [
  {
    id: 'billing-system',
    title: 'Process Bill',
    type: 'collapse',
    icon: 'feather icon-server',
    children: [
      {
        id: 'return-bills',
        title: 'Returned Bills',
        type: 'item',
        url: '/billings/returned-bills'
      },
      {
        id: 'all-bills',
        title: 'All Pending Bills',
        type: 'item',
        url: '/billings/all-pending-bills'
      },

    ]
  }
];

const NORMAL_BILL_VERIFY_ITEMS = [
  {
    id: 'billing-system',
    title: 'Process Bill',
    type: 'collapse',
    icon: 'feather icon-server',
    children: [
      {
        id: 'all-bills',
        title: 'All Pending Bills',
        type: 'item',
        url: '/billings/all-pending-bills'
      },
      {
        id: 'verify',
        title: 'Verify',
        type: 'item',
        url: '/billings/verify'
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
];

const AUTHORIZE_BILL_ITEMS = [
  {
    id: 'billing-system',
    title: 'Process Bill',
    type: 'collapse',
    icon: 'feather icon-server',
    children: [
      {
        id: 'all-bills',
        title: 'All Pending Bills',
        type: 'item',
        url: '/billings/all-pending-bills'
      },
      {
        id: 'authorize',
        title: 'Authorize',
        type: 'item',
        url: '/billings/authorize'
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
];

const APPROVE_BILL_ITEMS = [
  {
    id: 'billing-system',
    title: 'Process Bill',
    type: 'collapse',
    icon: 'feather icon-server',
    children: [
      {
        id: 'all-bills',
        title: 'All Pending Bills',
        type: 'item',
        url: '/billings/all-pending-bills'
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
  }
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
    switch (role){
      case 'ADMINISTRATOR':
        return NavigationItems;
      case 'BILLER':
        return BillerNavigationItems;
      case 'AUTHORIZER':
        return BillerNavigationItems;
      case 'APPROVER':
        return BillerNavigationItems;
      case 'REVIEWER':
        return BillerNavigationItems;

      default:
        return [];
    }


  }
}
