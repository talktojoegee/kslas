import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {Location, CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-paid-bills',
  imports: [RouterLink, CommonModule, CardComponent, TableModule, Button,
    IconFieldModule, InputIconModule, PaginatorModule],
  templateUrl: './paid-bills.component.html',
  styleUrl: './paid-bills.component.scss'
})
export class PaidBillsComponent {


  APP_CURRENCY: string = environment.APP_CURRENCY;
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;
  lgaList: any [] = [];
  billList: any [] = [];
  errorBag: any[] = [];
  skip: number = 0;
  limit: number = 20;
  total: number = 0;
  grossBill:number = 0;
  grossAmountPaid:number = 0;
  balanceAmount:number = 0;
  billingYear:number = new Date().getFullYear();
  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private location: Location) {}



  ngOnInit() {
    this.loadPaidBills({ first: 0, rows: 20 });
  }

   loadPaidBills(event: any) {
    this.isLoading = true;
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
     let authUser = this.apiService.getItem('uuid');
    let url = `billing/paid/${authUser}/${this.limit}/${this.skip}`;
    this.apiService.get(url).subscribe((result:any)=>{
      this.billList = result.data;
      this.total = result.total;
      this.grossBill = result.grossBills;
      this.grossAmountPaid = result.grossAmountPaid;
      this.balanceAmount = result.balanceAmount;
      this.isLoading = false;
    },error => {
      this.errorBag = error.message
      this.isLoading = false;
    })


  }

  goBack(): void {
    this.location.back();
  }

}
