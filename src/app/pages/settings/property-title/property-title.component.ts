import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-property-title',
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './property-title.component.html',
  styleUrl: './property-title.component.scss',
  providers: [MessageService]
})
export class PropertyTitleComponent {


  title : string = "Property Title";
  titleList: any [] = [];
  errorBag: {} = {};

  isFormSubmitted: boolean = false;
  titleHandler: any = {
    title: '',
  };
  titleForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadTitles();
  }

  onSaveTitle(){
    if (this.titleForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.titleForm.value;
    this.apiService.post(`property-title/new`, this.formValue).subscribe({
      next: (response:any) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful!',
          detail: response.message
        });
        this.titleForm.reset();
        this.loadTitles()
      },
      error: (error:any) => {
        if (error.status === 400) {
          this.errorBag = error.error; // Server returns field-level errors
        }
        this.isFormSubmitted = false;
      }
    });


  }

  loadTitles(){
    this.apiService.get(`property-title/all`).subscribe((result:any)=>{
      this.titleList = result.data;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })
  }

}
