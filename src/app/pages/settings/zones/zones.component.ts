import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-zones',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,ToastModule],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.scss',
  providers: [MessageService]
})
export class ZonesComponent {

  title : string = "Zones";
  //lgaObj : LGA = new LGA();
  zoneList: any [] = [];
  errorBag: any[] = [];
  //private baseUrl : string = environment.BASE_URL;

  isFormSubmitted: boolean = false;
  zoneHandler: any = {
    zoneName: '',
    subZone: '',
  };
  zoneForm: FormGroup = new FormGroup({
    zoneName: new FormControl("", [Validators.required]),
    subZone: new FormControl("", [Validators.required]),
  });
  formValue: any;
  constructor(private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.loadZones();
  }

  onSaveZone(){

    this.isFormSubmitted = true;
    this.formValue = this.zoneForm.value;
    this.apiService.post(`zone/new`, this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'New record added to the system.'
      });
      this.loadZones();
      this.zoneForm.reset();
    },error=>{
      this.isFormSubmitted = false;
    })


  }


  loadZones(){
    this.apiService.get(`zone/all`).subscribe((result:any)=>{
      this.zoneList = result.data;
    },error => {
      this.errorBag = error.message

    })
  }
}
