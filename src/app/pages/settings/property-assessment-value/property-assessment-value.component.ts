import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
declare var bootstrap: any;

@Component({
  selector: 'app-property-assessment-value',
  imports: [ReactiveFormsModule, CommonModule, ToastModule, MultiSelectModule, FormsModule,
    TableModule, Button,
    IconFieldModule, InputIconModule,PaginatorModule],
  templateUrl: './property-assessment-value.component.html',
  styleUrl: './property-assessment-value.component.scss',
  providers: [MessageService],
})
export class PropertyAssessmentValueComponent implements OnInit{

  pavForm!:FormGroup;
  zoneOptions:any = [];
  title: string = "Billing Setup";
  APP_CURRENCY: string = environment.APP_CURRENCY;
  isLoading: boolean = false;

  pavList: any [] = [];
  zoneList: any [] = [];
  classList: any [] = [];
  selected:any = [];
  //selectedZones: any [] = [];
  errorBag: {} = {};
  selectedValue: any = null;
  skip :number =  0;
  limit:number  = 0;
  total:number  = 0;

  isFormSubmitted: boolean = false;
  formValue: any;
  editForm = this.fb.group({
    pav_code: ["", Validators.required],
    //assessed_amount: ["", Validators.required],
    //value_rate: ["", Validators.required],
    ba: ["", Validators.required],
    rr: ["", Validators.required],
    lr: ["", Validators.required],
    br: ["", Validators.required],
    class_id: ["1", Validators.required],
    zone: ["", Validators.required],
    description: ["", Validators.required],
    id: ["", Validators.required],
    syncWord: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService,
              private messageService: MessageService) {

  }


  ngOnInit():void {
    this.initiateForm();
    this.loadPAVs({ first: 0, rows: 20 });
    this.loadClasses();
    this.loadZones();
  }

  initiateForm(){
    this.pavForm = this.fb.group({
      pav_code: ["", Validators.required],
      //assessed_amount: ["", Validators.required],
      //value_rate: ["", Validators.required],
      ba: ["", Validators.required],
      rr: ["", Validators.required],
      lr: ["", Validators.required],
      br: ["", Validators.required],
      class_id: ["1", Validators.required],
      zone: ["", Validators.required],
      description: ["", Validators.required],
      syncWord: ["", Validators.required],
    });
  }



  onSavePAV(){
    if (this.pavForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.pavForm.value;
    this.apiService.post(`property-assessment-value/new`, this.formValue).subscribe({
      next: (response:any) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: 'New record added to the system.'
        });
        this.pavForm.reset();
        this.loadPAVs({ first: 0, rows: 20 })
      },
      error: (error:any) => {
        if (error.status === 400) {
          this.errorBag = error.error; // Server returns field-level errors
        }
        this.isFormSubmitted = false;
      }
    });


  }

  onSaveChanges(){
    if (this.editForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.editForm.value;
    this.apiService.post(`property-assessment-value/update`, this.formValue).subscribe({
      next: (response:any) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: 'Changes saved!'
        });
        this.loadPAVs({ first: 0, rows: 20 })
      },
      error: (error:any) => {
        if (error.status === 400) {
          this.errorBag = error.error;
        }
        this.isFormSubmitted = false;
      }
    });


  }

  loadPAVs(event: any){
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
    this.apiService.get(`property-assessment-value/all/${this.limit}/${this.skip}`).subscribe((result:any)=>{
      this.pavList = result.data;
      this.total = result.total;
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
        );

      })
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

  launchModal(item){
    this.zoneOptions = [];
    this.loadZones();
    this.editForm.setValue({
      pav_code:item?.pavCode || '',
      ba:item?.ba || '0',
      rr:item?.rr || '0',
      lr:item?.lr || '0',
      br:item?.br || '0',
      zone:item?.zone?.split(', ') || [],
      class_id:item?.className || '',
      description:item?.occupancy || '',
      id:item?.id,
      syncWord:item?.syncWord,
    });
    //zone:this.zoneOptions,
    this.openModal("editBillingSetup");
  }

  openModal(elementId: string) {
    const modalElement = document.getElementById(elementId);
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  closeModal(elementId: string) {
    const modalElement = document.getElementById(elementId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }



}
