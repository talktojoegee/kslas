import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {environment} from "../../../../environments/environment.development";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-relief',
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './relief.component.html',
  styleUrl: './relief.component.scss',
  providers: [MessageService]
})
export class ReliefComponent {
  title : string = "Relief";
  reliefList: any [] = [];
  errorBag: {} = {};
  private baseUrl : string = environment.BASE_URL;

  isFormSubmitted: boolean = false;
  reliefForm: FormGroup = new FormGroup({
    item: new FormControl("", [Validators.required]),
    rate: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadRelieves();

    //const token = localStorage.getItem('authToken');
    //console.log('Token in guard:', token);
  }

  onSaveRelief(){
    if (this.reliefForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.reliefForm.value;
    this.apiService.post(`relief/new`, this.formValue).subscribe({
      next: (response:any) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful!',
          detail: response.message,
        });
        this.reliefForm.reset();
        this.loadRelieves()
      },
      error: (error:any) => {
        if (error.status === 400) {
          this.errorBag = error.error; // Server returns field-level errors
        }
        this.isFormSubmitted = false;
      }
    });


  }

  loadRelieves(){
    this.apiService.get(`relief/all`).subscribe((result:any)=>{
      this.reliefList = result.data;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })



  }


}
