import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule, Location} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-lga-payments',
  imports: [RouterLink, CommonModule, CardComponent, TableModule, Button,
    IconFieldModule, InputIconModule, PaginatorModule],
  templateUrl: './lga-payments.component.html',
  styleUrl: './lga-payments.component.scss'
})
export class LgaPaymentsComponent {


  APP_CURRENCY: string = environment.APP_CURRENCY;
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;
  lgaList: any [] = [];
  billList: any [] = [];
  errorBag: any[] = [];
  grossBill:number = 0;
  grossAmountPaid:number = 0;
  balanceAmount:number = 0;
  total:number = 0;
  skip: number = 0;
  limit: number = 20;
  billingYear:number = new Date().getFullYear();
  searchValue: string | undefined;
  lgaName : string = '';
  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private location: Location) {}



  ngOnInit() {

    this.loadOutstandingBills({ first: 0, rows: 20 });
    this.lgaName = this.apiService.getItem("lgaName");
  }

  loadOutstandingBills(event: any) {
    this.isLoading = true;
    //this.loading = false;
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
    let authUser = this.apiService.getItem('uuid');
    let url = `billing/lga-outstanding-bills/${authUser}/${this.limit}/${this.skip}`;
    this.apiService.get(url).subscribe((result:any)=>{
      this.billList = result.data;
      this.total = result.total;
      this.grossBill = result.grossBills;
      this.grossAmountPaid = result.grossAmountPaid;
      this.balanceAmount = result.balanceAmount;
      this.isLoading = false;
      //this.loading = true;
    },error => {
      this.errorBag = error.message
      this.isLoading = false;
      //this.loading = true;
    })


  }

  goBack(): void {
    this.location.back();
  }


  downloadAttachment() {
    let type = "normal-outstanding";
    let authUser = this.apiService.getItem('uuid');
    this.apiService.downloadFile(`export-bills/${authUser}/${type}`).subscribe((response)=>{
      this.isFormSubmitted = false;
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bills.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    },error=>{

      this.isFormSubmitted = false;
    })
  }

}
