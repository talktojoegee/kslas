import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {LGA} from "../../../models/class/LGA";
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-depreciation',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './depreciation.component.html',
  styleUrl: './depreciation.component.scss',
  providers:[MessageService]
})
export class DepreciationComponent implements OnInit{
  title : string = "Depreciation";
  depreciationList: any [] = [];
  errorBag: any[] = [];
  depValue:number = 0;

  isFormSubmitted: boolean = false;

  depreciationForm: FormGroup = new FormGroup({
    range: new FormControl("", [Validators.required]),
    depreciationRate: new FormControl("", [Validators.required]),
    value: new FormControl(""),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadDepreciations();
  }

  loadDepreciations(){
    this.apiService.get(`depreciation/all`).subscribe((result:any)=>{
      this.depreciationList = result.data;
    },error => {
      this.errorBag = error.message

    })
  }

  submitData() {
    this.isFormSubmitted = true;
    this.depreciationForm.setValue({
      value: this.depValue,
      range:this.depreciationForm.get("range")?.value,
      //ageTo:this.depreciationForm.get("ageTo")?.value,
      depreciationRate:this.depreciationForm.get("depreciationRate")?.value,
    });

    this.formValue = this.depreciationForm.value;
    this.apiService.post(`depreciation/new`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'New record added to the system.'
      });
      this.depreciationForm.reset();
    },error=>{
      this.isFormSubmitted = false;
    })
  }

  handleDepreciationValue() {
    this.depValue = (100 - this.depreciationForm.get("depreciationRate")?.value);
  }
}
