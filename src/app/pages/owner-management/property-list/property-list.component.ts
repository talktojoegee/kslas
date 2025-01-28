import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {PaginationService} from "../../../services/pagination.service";
import {CommonModule, Location} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-property-list',
  imports: [ReactiveFormsModule, CommonModule, ToastModule, RouterLink, TableModule, Button,
    IconFieldModule, InputIconModule, PaginatorModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
  providers:[MessageService]
})
export class PropertyListComponent {

  pageTitle: string = "Property List";
  listForm!:FormGroup;
  APP_CURRENCY: string = environment.APP_CURRENCY;

  lgaList: any [] = [];
  ownerList: any[] = [];
  titleList: any[] = [];
  pavList: any[] = [];
  errorBag: {} = {};
  skip: number = 0;
  limit: number = 20;
  total: number = 0;

  //currentPage = 1;
  propertyList: any [] = [];
  perPage = 10;

  //currentPage: number = 1;
  itemsPerPage: number = 10;
  //totalPages: number = 0;
  isLoading: boolean = false;
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';
  currentPage = 1;
  totalPages = 1;
  pageSize = 10; // Adjust based on your backend

  isFormSubmitted: boolean = false;
  formValue: any;
  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private location: Location,
              private paginationService: PaginationService
  ) {

  }


  ngOnInit() {
    this.initiateForm();

    this.fetchData({ first: 0, rows: 20 });

    this.propertyList = Array.from({ length: 25 }, (_, i) => ({ name: `Item ${i + 1}` })); // Example data
    this.totalPages = Math.ceil(this.propertyList.length / this.itemsPerPage);
    //this.loadPropertyList();
    //this.loadOwners();
    //this.loadTitles();
    //this.loadLGAs();
    //this.loadPAVs();
  }

  initiateForm(){
    this.listForm = this.fb.group({
      buildingCode: ["", Validators.required],
      address: ["", Validators.required],
      //pl_lga: new FormControl("", [Validators.required]),
      area: ["", Validators.required],
      size: ["", Validators.required],
      image: [""],
      title: ["", Validators.required],
      owner: ["", Validators.required],
      pavCode: ["", Validators.required],
      lga: ["", Validators.required],
    });
  }
  onSavePropertyList(){
    if (this.listForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    this.errorBag = {};
    this.formValue = this.listForm.value;
    this.apiService.post(`property-list/new`, this.formValue).subscribe({
      next: (response :any) => {
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: response.message
        });
        this.listForm.reset();
        //this.loadPropertyList()
      },
      error: (error : any) => {
        if (error.status === 400) {
          this.errorBag = error.error; // Server returns field-level errors
        }
        this.isFormSubmitted = false;
      }
    });


  }

  /* loadPropertyList(){
     this.apiService.get(`property-list/all`).subscribe((result:any)=>{
       this.propertyList = result.data;
     },error => {
       this.errorBag = error.message
       //console.log(this.errorBag)
     })

   }*/

  loadLGAs(){
    this.apiService.get(`lga/all`).subscribe((result:any)=>{
      this.lgaList = result;
    },error => {
      this.errorBag = error.message

    })
  }
  loadTitles(){
    this.apiService.get(`property-title/all`).subscribe((result:any)=>{
      this.titleList = result;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })
  }
  loadOwners(){
    this.apiService.get(`owners/all`).subscribe((result:any)=>{
      this.ownerList = result.data;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })
  }
  loadPAVs(){
    this.apiService.get(`property-assessment-value/all`).subscribe((result:any)=>{
      this.pavList = result.data;
    },error => {
      this.errorBag = error.message
    })
  }

  goBack():void{
    this.location.back();
  }

  fetchData(event: any): void {
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
    let url = `property-list/all/${this.limit}/${this.skip}`;
    this.apiService.get(url).subscribe((result:any)=>{
      this.propertyList = result.list;
      this.total = result.total;
      this.isLoading = false;
    },error => {
      this.errorBag = error.message
      this.isLoading = false;
    })

  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchData(this.currentPage); // Fetch orders for the selected page
    }
  }


}
