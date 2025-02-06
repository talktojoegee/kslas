import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-charge-rate',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './charge-rate.component.html',
  styleUrl: './charge-rate.component.scss',
  providers:[MessageService]
})
export class ChargeRateComponent {

  title : string = "Charge Rate";
  chargeRateList: any [] = [];
  errorBag: any[] = [];
  depValue:number = 0;

  isFormSubmitted: boolean = false;

  chargeForm: FormGroup = new FormGroup({
    occupancy: new FormControl("", [Validators.required]),
    rate: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadChargeRates();
  }

  loadChargeRates(){
    this.apiService.get(`charge-rate/all`).subscribe((result:any)=>{
      this.chargeRateList = result.data;
    },error => {
      this.errorBag = error.message

    })
  }

  submitData() {
    this.isFormSubmitted = true;
    this.chargeForm.setValue({
      rate:this.chargeForm.get("rate")?.value,
      occupancy:this.chargeForm.get("occupancy")?.value,
    });

    this.formValue = this.chargeForm.value;
    this.apiService.post(`charge-rate/new`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'Record saved'
      });
      this.chargeForm.reset();
      this.loadChargeRates();
    },error=>{
      this.isFormSubmitted = false;
    })
  }


}
