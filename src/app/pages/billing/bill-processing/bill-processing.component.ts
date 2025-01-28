import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, Location} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {RouterLink} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-bill-processing',
  imports: [ReactiveFormsModule, CommonModule, ToastModule,RouterLink, SharedModule],
  templateUrl: './bill-processing.component.html',
  styleUrl: './bill-processing.component.scss',
  providers: [MessageService]
})
export class BillProcessingComponent {



  APP_CURRENCY: string = environment.APP_CURRENCY;
  isFormSubmitted: boolean = false;
  lgaList: any [] = [];
  billList: any [] = [];
  errorBag: any[] = [];

  message:string = '';
  errorMessage:string = '';
  successMessage:string = '';
  lgaName:string = '';
  noOfBuildings:number = 0;
  noOfBills:number = 0;
  billAmount:number = 0;
  billId:number = 0;
  isRetrieved:boolean = false;
  isProcessed:boolean = false;

  billingYear:number = new Date().getFullYear();
  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private location: Location,
              private commonService: CommonService
  ) {}

  billingForm: FormGroup = new FormGroup({
    //lgaId: new FormControl("", [Validators.required]),
    year: new FormControl("", [Validators.required]),
    billedBy: new FormControl(1),
  });


  processBillForm: FormGroup = new FormGroup({
    lgaId: new FormControl("", [Validators.required]),
    year: new FormControl("", [Validators.required]),
    billedBy: new FormControl(1),
  });
  formValue: any;
  private validationErrors: any;

  ngOnInit() {

    this.loadLGAs();
  }



  processBilling(){

    this.isFormSubmitted = true;
    this.formValue = this.processBillForm.value;
    this.apiService.post(`billing/process`, this.formValue).subscribe({
      next: (res:any)=>{
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Response',
          detail: "Bill Process Request Done"
        });
        this.successMessage = "Action successful!";
        this.billList = res.data;
        this.loadLGAs();
        //this.billingForm.reset();
        this.isProcessed = true;
        this.isRetrieved = false;
      },
      error:(error)=>{
        //console.log(error)
        //this.message = error || 'An unexpected error occurred';
        this.errorMessage = error.message;
        //console.error('Error occurred:', this.message);
        this.commonService.showError(this.errorMessage);
        this.isFormSubmitted = false;
        this.isProcessed = false;
        this.isRetrieved = false;
      }
    });



  }

  loadLGAs(){
    this.apiService.get(`lga/all`).subscribe((result:any)=>{
      const lgaObj =  {
        "id": 0,
        "lgaName": "All LGAs"
      };
      this.lgaList.push(lgaObj);
      result.data.map((lga)=>{
        let lg = {
          "id": lga.id,
          "lgaName": lga.lgaName
        };
        this.lgaList.push(lg);
      })
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
      // alert("Whoops! Something went wrong.")
    })


  }

  retrieveBills() {
    this.isFormSubmitted = true;
    this.formValue = this.billingForm.value;
    this.billingYear = this.formValue.year;
    this.apiService.post(`billing/retrieve`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bills Retrieved!"
      });
      this.billList = res.data;
      /*this.lgaName = res.data.lgaName;
      this.noOfBuildings = res.data.noOfBuildings;
      this.noOfBills = res.data.noOfBills;
      this.billAmount = res.data.billAmount;
      this.billId = res.data.id;*/
      this.isRetrieved = true;
      this.isProcessed = false;

      this.loadLGAs();
      //this.billingForm.reset();
    },(error)=>{
      this.isFormSubmitted = false;
      this.isRetrieved = false;
      this.isProcessed = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Conflict Error',
        detail: error.error.message
      });
    })
  }

  goBack():void{
    this.location.back();
  }

}
