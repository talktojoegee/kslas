import { Component } from '@angular/core';
import {Router,ActivatedRoute, RouterModule} from '@angular/router';
import {ApiService} from "../../../../services/api.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {CommonModule} from "@angular/common";
import {CommonService} from "../../../../services/common.service";

@Component({
  selector: 'app-auth-signin',
  imports: [RouterModule, ToastModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
  providers: [MessageService]
})
export default class AuthSigninComponent {


  public isFormSubmitted :boolean = false;
  private successMessage:string = '' ;
  public errorMessage:string = '';
  payload: any;


  constructor(private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private messageService: MessageService) {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });


  handleLogin(){
    //debugger
    this.isFormSubmitted = true;
    this.payload = this.loginForm.value;
    this.apiService.post("authenticate", this.payload).subscribe((res:any)=>{
      //this.commonService.showSuccess("Login successful. Redirecting...");
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'Login successful. Redirecting...'
      });
      const { token, username, email, name, id } = res.data;
      this.apiService.storeToken(token);
      this.apiService.storeUserData("username", username);
      this.apiService.storeUserData("email", email);
      this.apiService.storeUserData("name", name);
      this.apiService.storeUserData("uuid", id);
      this.isFormSubmitted = false;
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.router.navigate([returnUrl]);
    },(error) => {
      this.isFormSubmitted = false;
      this.errorMessage = error.message;
      this.commonService.showError(this.errorMessage);
    });

  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  getUserDetails(){

  }
}


/*

const token = this.authService.getToken();
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

// Sending user ID along with the POST request
const userId = this.authService.currentUser.value.id;*/
