// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { HttpErrorInterceptor } from "./services/http.interceptor";

// project import
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavLogoComponent } from './theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { ToggleFullScreenDirective } from './theme/shared/components/full-screen/toggle-full-screen';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
//import {PrimeNGConfig} from "primeng/api";
import {RouterModule} from "@angular/router";
import {Angular4PaystackModule} from "angular4-paystack";
import {environment} from "../environments/environment.development";

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    AdminComponent,
    ConfigurationComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavLogoComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    NavSearchComponent,
    ToggleFullScreenDirective
  ],
  imports: [RouterModule, BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule,
    SharedModule, BrowserAnimationsModule, HttpClientModule,
    Angular4PaystackModule.forRoot(environment.PAYSTACK_PUBLIC_KEY),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // Correctly imported
      useClass: HttpErrorInterceptor, // Ensure this is the name of your interceptor class
      multi: true, // Ensures multiple interceptors can coexist
    },
    NavigationItem,MessageService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
