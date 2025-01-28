// angular import
import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-nav-right',
    templateUrl: './nav-right.component.html',
    styleUrls: ['./nav-right.component.scss'],
    standalone: false,
})
export class NavRightComponent implements OnInit{

  user: any;
  authName:string;
  authUsername:string;
  authEmail:string;
  authId:number;
  constructor(private apiService: ApiService, private router: Router,) {
  }

  ngOnInit(): void {
    this.authName = this.apiService.getItem("name");
  }


  logout() {
    localStorage.removeItem('authToken');
    //this.apiService.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }
}
