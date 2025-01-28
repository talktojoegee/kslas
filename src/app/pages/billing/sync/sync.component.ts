import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {CommonModule, Location} from "@angular/common";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-sync',
  imports: [ToastModule, ReactiveFormsModule, CommonModule, CardComponent, TableModule, Button,
    IconFieldModule, InputIconModule, PaginatorModule],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.scss',
  providers: [MessageService]
})
export class SyncComponent {



  lgaList: any[] = [];
  logList: any[] = [];
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;
  syncForm!: FormGroup;
  formValue:any;

  total:number = 0;
  skip: number = 0;
  limit: number = 20;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private messageService: MessageService,
              private location:Location
  ) {
  }

  ngOnInit(): void {
    this.loadLGAs();
    this.loadSyncLog({ first: 0, rows: 10 });
    this.initiateForm();
  }

  initiateForm(){
    this.syncForm = this.fb.group({
      lgaId: ["", Validators.required]
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
      });
      //console.log(this.lgaList)
    },error => {
      //this.errorBag = error.message
    })
  }
  loadSyncLog(event: any){
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
    let url = `synchronization-report/${this.limit}/${this.skip}`;
    this.apiService.get(url).subscribe((result:any)=>{
      this.logList = result.data;
      this.total = result.total;
      //console.log(this.lgaList)
    },error => {
      //this.errorBag = error.message
    })
  }

  syncData(){
    this.formValue = this.syncForm.value;
    let id = this.formValue.lgaId;
    this.isFormSubmitted = true;
    this.apiService.get(`sync-data/${id}`).subscribe((result:any)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: result.data
      });
      this.isFormSubmitted = false;
      this.loadSyncLog({ first: 0, rows: 20 });
      //console.log(result)
    },(error:any) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }


  goBack():void {
    this.location.back();
  }


}
