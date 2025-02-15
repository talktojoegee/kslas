import { Component } from '@angular/core';
import {LGA} from "../../../models/class/LGA";
import {environment} from "../../../../environments/environment.development";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-roles-permissions',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, MultiSelectModule, CommonModule, ToastModule],
  templateUrl: './roles-permissions.component.html',
  styleUrl: './roles-permissions.component.scss',
  providers:[MessageService]
})
export class RolesPermissionsComponent {




  title : string = "Assign Permissions";
  lgaObj : LGA = new LGA();
  roleList: any [] = [];
  permissionList: any [] = [];
  errorBag: any[] = [];
  private baseUrl : string = environment.BASE_URL;

  isFormSubmitted: boolean = false;
  lgaHandler: any = {
    name: '',
  };
  form: FormGroup = new FormGroup({
    role: new FormControl("", [Validators.required]),
    permissions: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadRoles();
    this.loadPermissions();
  }

  onSaveRecord(){

    this.isFormSubmitted = true;
    this.formValue = this.form.value;
    this.apiService.post(`access/roles-permission/new`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'Permission assignment done!'
      });
      //this.loadRoles();
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


  loadPermissions(){
    this.apiService.get(`access/permissions/all`).subscribe((result:any)=>{
      //this.permissionList = result.data;
      result.data.map((permit)=>{
        const obj = {
          name:permit.permission,
          value:permit.id,
        }
        this.permissionList.push(obj)
      });

    },error => {
      this.errorBag = error.message

    })
  }



}
