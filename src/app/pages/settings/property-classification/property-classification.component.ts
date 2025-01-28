import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-property-classification',
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './property-classification.component.html',
  styleUrl: './property-classification.component.scss',
  providers: [MessageService]
})
export class PropertyClassificationComponent {


  title : string = "Property Classification";
  classList: any [] = [];
  errorBag: {} = {};

  isFormSubmitted: boolean = false;
  classHandler: any = {
    className: '',
  };
  classForm: FormGroup = new FormGroup({
    className: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadClasses();
  }

  onSaveClass(){
    if (this.classForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.classForm.value;
    this.apiService.post(`property-classification/new`, this.formValue).subscribe({
      next: (response:any) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: response.message
        });
        this.classForm.reset();
        this.loadClasses()
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorBag = error.error; // Server returns field-level errors
        }
        this.isFormSubmitted = false;
      }
    });


  }

  loadClasses(){
    this.apiService.get(`property-classification/all`).subscribe((result:any)=>{
      this.classList = result.data;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })

  }


}
