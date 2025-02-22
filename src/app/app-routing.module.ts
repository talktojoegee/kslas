import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import DashboardComponent from "./demo/dashboard/dashboard.component";
import {LgaComponent} from "./pages/settings/lga/lga.component";
import {ZonesComponent} from "./pages/settings/zones/zones.component";
import {ReliefComponent} from "./pages/settings/relief/relief.component";
import {PropertyTitleComponent} from "./pages/settings/property-title/property-title.component";
import {AreaOfficeComponent} from "./pages/settings/area-office/area-office.component";
import {
  PropertyClassificationComponent
} from "./pages/settings/property-classification/property-classification.component";
import {
  PropertyAssessmentValueComponent
} from "./pages/settings/property-assessment-value/property-assessment-value.component";
import {OwnersComponent} from "./pages/owner-management/owners/owners.component";
import {PropertyListComponent} from "./pages/owner-management/property-list/property-list.component";
import {SyncComponent} from "./pages/billing/sync/sync.component";
import {BillProcessingComponent} from "./pages/billing/bill-processing/bill-processing.component";
import {OutstandingBillsComponent} from "./pages/billing/outstanding-bills/outstanding-bills.component";
import {BillDetailComponent} from "./pages/billing/bill-detail/bill-detail.component";
import {RequestsComponent} from "./pages/objection/requests/requests.component";
import {VerificationComponent} from "./pages/objection/verification/verification.component";
import {AuthorizationComponent} from "./pages/objection/authorization/authorization.component";
import {ApprovalComponent} from "./pages/objection/approval/approval.component";
import {PaidBillsComponent} from "./pages/billing/paid-bills/paid-bills.component";
import AuthSigninComponent from "./demo/pages/authentication/auth-signin/auth-signin.component";
import {MakePaymentComponent} from "./pages/billing/make-payment/make-payment.component";
import {AuthGuard} from "./guard/auth.guard";
import {ObjectionDetailComponent} from "./pages/objection/objection-detail/objection-detail.component";
import {ObjectedBillsComponent} from "./pages/billing/objected-bills/objected-bills.component";
import {PendingBillsComponent} from "./pages/billing/bills/pending-bills/pending-bills.component";
import {VerifyBillsComponent} from "./pages/billing/bills/verify-bills/verify-bills.component";
import {AuthorizeBillsComponent} from "./pages/billing/bills/authorize-bills/authorize-bills.component";
import {ApproveBillsComponent} from "./pages/billing/bills/approve-bills/approve-bills.component";
import {PropertyDetailComponent} from "./pages/owner-management/property-detail/property-detail.component";
import {ReturnedBillsComponent} from "./pages/billing/bills/returned-bills/returned-bills.component";
import {DepreciationComponent} from "./pages/settings/depreciation/depreciation.component";
import {
  ReturnedSpecialInterestBillsComponent
} from "./pages/billing/special-interest/returned-special-interest-bills/returned-special-interest-bills.component";
import {
  VerifySpecialInterestBillsComponent
} from "./pages/billing/special-interest/verify-special-interest-bills/verify-special-interest-bills.component";
import {
  AuthorizeSpecialInterestBillsComponent
} from "./pages/billing/special-interest/authorize-special-interest-bills/authorize-special-interest-bills.component";
import {
  ApproveSpecialInterestBillsComponent
} from "./pages/billing/special-interest/approve-special-interest-bills/approve-special-interest-bills.component";
import {
  OutstandingSpecialInterestBillsComponent
} from "./pages/billing/special-interest/outstanding-special-interest-bills/outstanding-special-interest-bills.component";
import {ChargeRateComponent} from "./pages/settings/charge-rate/charge-rate.component";
import {AllPendingBillsComponent} from "./pages/billing/bills/all-pending-bills/all-pending-bills.component";
import {
  AllPendingBillDetailsComponent
} from "./pages/billing/bills/all-pending-bill-details/all-pending-bill-details.component";
import {SystemUsersComponent} from "./pages/settings/system-users/system-users.component";
import {RolesComponent} from "./pages/settings/roles/roles.component";
import {PermissionsComponent} from "./pages/settings/permissions/permissions.component";
import {RolesPermissionsComponent} from "./pages/settings/roles-permissions/roles-permissions.component";
import {PropertyExceptionsComponent} from "./pages/billing/property-exceptions/property-exceptions.component";
import {
  PaidSpecialInterestBillsComponent
} from "./pages/billing/special-interest/paid-special-interest-bills/paid-special-interest-bills.component";
import {ReviewBillComponent} from "./pages/billing/bills/review-bill/review-bill.component";
import {
  ReviewSpecialInterestBillComponent
} from "./pages/billing/special-interest/review-special-interest-bill/review-special-interest-bill.component";
import {MinimumLucComponent} from "./pages/settings/minimum-luc/minimum-luc.component";
import {DashboardLgaComponent} from "./demo/dashboard-lga/dashboard-lga.component";
import {UnauthorizedComponent} from "./demo/pages/authentication/unauthorized/unauthorized.component";
import {LgaOutstandingBillsComponent} from "./pages/lga-chair/lga-outstanding-bills/lga-outstanding-bills.component";
import {LgaPaymentsComponent} from "./pages/lga-chair/lga-payments/lga-payments.component";
//import {ObjectedBillsComponent} from "./pages/billing/objected-bills/objected-bills.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: AuthSigninComponent,
    //canActivate: [AuthGuard]
  },
  {

    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard],
        data: { permission: 'DASHBOARD' }
        //loadComponent: () => import('./demo/dashboard/dashboard.component')
      },
      {
        path: 'dashboard-lga',
        component: DashboardLgaComponent,
        canActivate:[AuthGuard],
        data: { permission: 'LGA_CHAIR_DASHBOARD' }
        //loadComponent: () => import('./demo/dashboard/dashboard.component')
      },
      {
        path: 'lga-outstanding-bills',
        component: LgaOutstandingBillsComponent,
        canActivate:[AuthGuard],
        data: { permission: 'LGA_CHAIR_DASHBOARD' }
      },
      {
        path: 'lga-payments',
        component: LgaPaymentsComponent,
        canActivate:[AuthGuard],
        data: { permission: 'LGA_CHAIR_DASHBOARD' }
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        canActivate:[AuthGuard],
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'apexchart',
        loadComponent: () => import('./demo/chart/apex-chart/apex-chart.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/extra/sample-page/sample-page.component')
      },
      {
        path: 'settings',
        children:[
          {
            path: 'lgas',
            component: LgaComponent,
            canActivate:[AuthGuard],
            data: { permission: 'HOUSE_KEEPING' }
          },
          {
            path: 'zones',
            component: ZonesComponent,
            canActivate:[AuthGuard],
            data: { permission: 'HOUSE_KEEPING' }
          },
          {
            path: 'relief',
            component: ReliefComponent,
            canActivate:[AuthGuard],
            data: { permission: 'HOUSE_KEEPING' }
          },
          {
            path: 'property-title',
            component: PropertyTitleComponent,
            canActivate:[AuthGuard],
            data: { permission: 'HOUSE_KEEPING' }
          },
          {
            path: 'zones',
            component: ZonesComponent,
            canActivate:[AuthGuard],
            data: { permission: 'HOUSE_KEEPING' }
          },
          {
            path: 'area-office',
            component: AreaOfficeComponent,
            canActivate:[AuthGuard],
            data: { permission: 'HOUSE_KEEPING' }
          },
          {
            path: 'property-classification',
            component: PropertyClassificationComponent,
            canActivate:[AuthGuard],
            data: { permission: 'HOUSE_KEEPING' }
          },
          {
            path: 'property-assessment-value',
            component: PropertyAssessmentValueComponent,
            canActivate:[AuthGuard],
            data: { permission: 'BILLING_SETUP' }
          },
          {
            path: 'depreciation',
            component: DepreciationComponent,
            canActivate:[AuthGuard],
            data: { permission: 'BILLING_SETUP' }
          },
          {
            path: 'charge-rate',
            component: ChargeRateComponent,
            canActivate:[AuthGuard],
            data: { permission: 'BILLING_SETUP' }
          },
          {
            path: 'system-users',
            component: SystemUsersComponent,
            canActivate:[AuthGuard],
             data: { permission: 'USER_ACCOUNT' }
          },
          {
            path: 'roles',
            component: RolesComponent,
            canActivate:[AuthGuard],
             data: { permission: 'USER_ACCOUNT' }
          },
          {
            path: 'permissions',
            component: PermissionsComponent,
            canActivate:[AuthGuard],
             data: { permission: 'USER_ACCOUNT' }
          },
          {
            path: 'roles-permissions',
            component: RolesPermissionsComponent,
            canActivate:[AuthGuard],
             data: { permission: 'USER_ACCOUNT' }
          },
          {
            path: 'minimum-luc',
            component: MinimumLucComponent,
            canActivate:[AuthGuard],
            data: { permission: 'MINIMUM_LUC' }
          },
        ],
      },
      {
        path: 'owner-management',
        children:[
          {
            path: 'owners',
            component: OwnersComponent,
            canActivate:[AuthGuard],
             data: { permission: 'MANAGE_PROPERTY' }
          },
          {
            path: 'property-list',
            component: PropertyListComponent,
            canActivate:[AuthGuard],
             data: { permission: 'MANAGE_PROPERTY' }
          },
          {
            path: "property-details/:id",
            component: PropertyDetailComponent,
            canActivate:[AuthGuard],
             data: { permission: 'MANAGE_PROPERTY' }
          },
        ]
      },
      {
        path: 'billings',
        children:[
          {
            path: 'synchronization',
            component: SyncComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'property-exceptions',
            component: PropertyExceptionsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'process',
            component: BillProcessingComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'paid',
            component: PaidBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'paid-special-interest-bills',
            component: PaidSpecialInterestBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'review-special-interest-bills',
            component: ReviewSpecialInterestBillComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'outstanding',
            component: OutstandingBillsComponent,
            canActivate:[AuthGuard],
          },

          {
            path: "details/:url",
            component: BillDetailComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "details/all-pending-bills/:url",
            component: AllPendingBillDetailsComponent,
            canActivate:[AuthGuard],
          },

          {
            path: "make-payment/:url",
            component: MakePaymentComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "pending",
            component: PendingBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "returned-bills",
            component: ReturnedBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "all-pending-bills",
            component: AllPendingBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "returned-special-interest-bills",
            component: ReturnedSpecialInterestBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "special-interest/verify",
            component: VerifySpecialInterestBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "special-interest/authorize",
            component: AuthorizeSpecialInterestBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "special-interest/approve",
            component: ApproveSpecialInterestBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "special-interest/outstanding",
            component: OutstandingSpecialInterestBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "verify",
            component: VerifyBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "review",
            component: ReviewBillComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "authorize",
            component: AuthorizeBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "approve",
            component: ApproveBillsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "objected",
            component: ObjectedBillsComponent,
            canActivate:[AuthGuard],
          },
        ]
      },
      {
        path: 'objections',
        children:[
          {
            path: 'requests',
            component: RequestsComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'verification',
            component: VerificationComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'authorization',
            component: AuthorizationComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "approval",
            component: ApprovalComponent,
            canActivate:[AuthGuard],
          },
          {
            path: "details/:requestId",
            component: ObjectionDetailComponent,
            canActivate:[AuthGuard],
          },
        ]
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
