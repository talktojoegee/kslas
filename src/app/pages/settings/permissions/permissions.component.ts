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
  selector: 'app-permissions',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, CommonModule, ToastModule, MultiSelectModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss',
  providers:[MessageService]
})
export class PermissionsComponent {


  title : string = "Local Government Areas";
  lgaObj : LGA = new LGA();
  permissionList: any [] = [];
  errorBag: any[] = [];
  roleList: any[] = [];
  private baseUrl : string = environment.BASE_URL;

  isFormSubmitted: boolean = false;
  lgaHandler: any = {
    lgaName: '',
  };
  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    //selectedRoles: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadPermissions();
    this.loadRoles();
  }

  onSavePermission(){

    this.isFormSubmitted = true;
    this.formValue = this.form.value;
    this.apiService.post(`access/permissions/new`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'New record added to the system.'
      });
      this.loadPermissions();
      this.form.reset();
    },error=>{
      this.isFormSubmitted = false;
    })


  }


  loadPermissions(){
    this.apiService.get(`access/permissions/all`).subscribe((result:any)=>{
      this.permissionList = result.data;
    },error => {
      this.errorBag = error.message

    })
  }


  loadRoles(){
    this.apiService.get(`access/roles/all`).subscribe((result:any)=>{
      result.data.map((role)=>{
        const obj = {
          name:role.name,
          value:role.id,
        }
        this.roleList.push(obj)
      });
    },error => {
      this.errorBag = error.message
    })
  }



}
