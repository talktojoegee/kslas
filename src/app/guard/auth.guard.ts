import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {ApiService} from "../services/api.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private apiService: ApiService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    const userPermissions = this.apiService.getItem('permissions');
    const permissionArray = userPermissions.split(',');
    const requiredPermission = route.data['permission'];
    if (!requiredPermission || permissionArray.includes(requiredPermission)) {
      return true;
    }else{
      this.router.navigate(['/unauthorized']);
    }

    if (token) {
      return true; // Allow access
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Block access
    }
  }
}
