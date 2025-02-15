import { Component } from '@angular/core';
import {LGA} from "../../../models/class/LGA";
import {environment} from "../../../../environments/environment.development";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-roles',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  providers:[MessageService]
})
export class RolesComponent {



  title : string = "Roles";
  lgaObj : LGA = new LGA();
  roleList: any [] = [];
  errorBag: any[] = [];
  private baseUrl : string = environment.BASE_URL;

  isFormSubmitted: boolean = false;
  lgaHandler: any = {
    name: '',
  };
  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadRoles();
  }

  onSaveRecord(){

    this.isFormSubmitted = true;
    this.formValue = this.form.value;
    this.apiService.post(`access/roles/new`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'New record added to the system.'
      });
      this.loadRoles();
      this.form.reset();
    },error=>{
      this.isFormSubmitted = false;
    })


  }


  loadRoles(){
    this.apiService.get(`access/roles/all`).subscribe((result:any)=>{
      this.roleList = result.data;
    },error => {
      this.errorBag = error.message

    })
  }




}
