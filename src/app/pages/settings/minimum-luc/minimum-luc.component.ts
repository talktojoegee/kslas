import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-minimum-luc',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './minimum-luc.component.html',
  styleUrl: './minimum-luc.component.scss',
  providers:[MessageService]
})
export class MinimumLucComponent {

  title : string = "Minimum Land Use Charge(LUC)";
  depreciationList: any [] = [];
  errorBag: any[] = [];
  minLUC:number = 0;

  isFormSubmitted: boolean = false;

  form: FormGroup = new FormGroup({
    amount: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadLUC();
  }

  loadLUC(){
    this.apiService.get(`luc/record`).subscribe((result:any)=>{
      //this.depreciationList = result.data;
      this.minLUC = result.data?.amount;
    },error => {
      this.errorBag = error.message

    })
  }

  submitData() {
    this.isFormSubmitted = true;
    this.formValue = this.form.value;
    this.apiService.post(`luc/record`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'New minimumm Land Use Charge(LUC) set'
      });
      this.form.reset();
      this.loadLUC();
    },error=>{
      this.isFormSubmitted = false;
    })
  }


}
