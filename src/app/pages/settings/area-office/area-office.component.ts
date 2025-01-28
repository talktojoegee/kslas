import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-area-office',
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './area-office.component.html',
  styleUrl: './area-office.component.scss',
  providers: [MessageService]
})
export class AreaOfficeComponent {


  areaOfficeForm!: FormGroup;
  isFormSubmitted: boolean = false;
  lgaList:any [] = [];
  areaOfficeList: any[] = [];
  errorBag:[] = [];
  formValue: any;
  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initiateForm();
    this.loadLGAs();
    this.loadAreaOffices();
  }

  initiateForm(){
    this.areaOfficeForm = this.fb.group({
      areaOfficeId: ["", Validators.required],
      areaName: ["", Validators.required],
      lgaId: ["", Validators.required]
    });
  }

  onSaveAreaOffice(){
    if(this.areaOfficeForm.valid){
      this.isFormSubmitted = true;
      this.formValue = this.areaOfficeForm.value;
      this.apiService.post(`area-office/new`, this.formValue).subscribe((res:any)=>{
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: res.message
        });

        this.loadLGAs();
        this.loadAreaOffices();
        this.areaOfficeForm.reset();
      },(error:any)=>{
        this.isFormSubmitted = false;
      })
    }


  }

  loadLGAs(){
    this.apiService.get(`lga/all`).subscribe((result:any)=>{
      this.lgaList = result.data;
    },error => {
      this.errorBag = error.message
    })

  }
  loadAreaOffices(){
    this.apiService.get(`area-office/all`).subscribe((result:any)=>{
      this.areaOfficeList = result.data;
    },error => {
      this.errorBag = error.message
    })

  }

}
