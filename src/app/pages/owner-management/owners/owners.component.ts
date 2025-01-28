import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-owners',
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.scss',
  providers: [MessageService]
})
export class OwnersComponent {

  title: string = "Owners";
  APP_CURRENCY: string = environment.APP_CURRENCY;

  ownerList: any [] = [];
  lgaList: any [] = [];
  errorBag: {} = {};

  isFormSubmitted: boolean = false;
  ownerForm: FormGroup = new FormGroup({
    kgtin: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    telephone: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    resAddress: new FormControl("", [Validators.required]),
    lga_id: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService,
              private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadOwners();
    this.loadLGAs();
  }

  onSaveOwner(){
    if (this.ownerForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.ownerForm.value;
    this.apiService.post(`owners/new`, this.formValue).subscribe({
      next: (response) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: 'New record added to the system.'
        });
        this.ownerForm.reset();
        this.loadOwners()
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorBag = error.error; // Server returns field-level errors
        }
        this.isFormSubmitted = false;
      }
    });


  }

  loadOwners(){
    this.apiService.get(`owners/all`).subscribe((result:any)=>{
      this.ownerList = result.data;
    },error => {
      this.errorBag = error.message
    })
  }

  loadLGAs(){
    this.apiService.get(`lga/all`).subscribe((result:any)=>{
      this.lgaList = result.data;
    },error => {
      this.errorBag = error.message

    })
  }



}
