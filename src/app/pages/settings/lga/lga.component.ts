import { Component } from '@angular/core';
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {environment} from "../../../../environments/environment.development";
import {LGA} from "../../../models/class/LGA";
import {ApiService} from "../../../services/api.service";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-lga',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './lga.component.html',
  styleUrl: './lga.component.scss',
  standalone:true,
  providers:[MessageService]
})
export class LgaComponent {
  title : string = "Local Government Areas";
  lgaObj : LGA = new LGA();
  lgaList: any [] = [];
  errorBag: any[] = [];
  private baseUrl : string = environment.BASE_URL;

  isFormSubmitted: boolean = false;
  lgaHandler: any = {
    lgaName: '',
  };
  lgaForm: FormGroup = new FormGroup({
    lgaName: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadLGAs();
  }

  onSaveLGA(){

    this.isFormSubmitted = true;
    this.formValue = this.lgaForm.value;
    this.apiService.post(`lga/new`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'New record added to the system.'
      });
      this.loadLGAs();
      this.lgaForm.reset();
    },error=>{
      this.isFormSubmitted = false;
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
