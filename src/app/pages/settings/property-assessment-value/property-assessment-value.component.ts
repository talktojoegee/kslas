import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-property-assessment-value',
  imports: [ReactiveFormsModule, CommonModule, ToastModule, MultiSelectModule],
  templateUrl: './property-assessment-value.component.html',
  styleUrl: './property-assessment-value.component.scss',
  providers: [MessageService],
})
export class PropertyAssessmentValueComponent {

  pavForm!:FormGroup;
  zoneOptions:any = [];
  title: string = "Property Assessment Value(PAV)";
  APP_CURRENCY: string = environment.APP_CURRENCY;

  pavList: any [] = [];
  zoneList: any [] = [];
  classList: any [] = [];
  selected:any = [];
  //selectedZones: any [] = [];
  errorBag: {} = {};
  selectedValue: any = null;

  isFormSubmitted: boolean = false;
  formValue: any;
  constructor(private fb: FormBuilder, private apiService: ApiService,
              private messageService: MessageService) {

  }


  ngOnInit():void {
    this.initiateForm();
    /* this.pavForm.get('class_id')?.valueChanges.subscribe((value) => {
       //console.log('Dropdown value changed:', value);
       //this.onDropdownChange(value); // Call a custom method
     });*/

    this.loadPAVs();
    this.loadClasses();
    this.loadZones();


  }

  initiateForm(){
    this.pavForm = this.fb.group({
      pav_code: ["", Validators.required],
      assessed_amount: ["", Validators.required],
      value_rate: ["", Validators.required],
      //class_id: new FormControl("56"),
      class_id: ["", Validators.required],
      zone: ["", Validators.required],
      description: ["", Validators.required],
      //selectedZones: ["", Validators.required]

    });
  }



  onSavePAV(){
    if (this.pavForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.pavForm.value;
    //console.log(this.formValue)
    this.apiService.post(`property-assessment-value/new`, this.formValue).subscribe({
      next: (response:any) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: 'New record added to the system.'
        });
        this.pavForm.reset();
        this.loadPAVs()
      },
      error: (error:any) => {
        if (error.status === 400) {
          this.errorBag = error.error; // Server returns field-level errors
        }
        this.isFormSubmitted = false;
      }
    });


  }

  loadPAVs(){
    this.apiService.get(`property-assessment-value/all`).subscribe((result:any)=>{
      this.pavList = result.data;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })
  }
  loadZones(){
    this.apiService.get(`zone/all`).subscribe((result:any)=>{
      this.zoneList = result.data;
      this.zoneList.map(item=>{

        this.zoneOptions.push(
          {
            label:item.subZone,
            value:item.subZone
          }
        )
        //this.zoneOptions.push({name:item.subZone});
      })
      /* for(let item of this.zoneList){
         this.zoneOptions.push({name:item.zoneName});
       }
       console.log(this.zoneOptions)*/
      //console.log(this.zoneOptions)
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })
  }

  loadClasses(){
    this.apiService.get(`property-classification/all`).subscribe((result:any)=>{
      this.classList = result.data;
    },error => {
      this.errorBag = error.message
    })

  }


}
