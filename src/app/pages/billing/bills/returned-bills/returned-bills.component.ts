import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment.development";
import {ApiService} from "../../../../services/api.service";
import {MessageService} from "primeng/api";
import {CommonModule, Location} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CardComponent} from "../../../../theme/shared/components/card/card.component";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-returned-bills',
  imports: [RouterLink, CommonModule, CardComponent, TableModule, Button,
    IconFieldModule, InputIconModule, PaginatorModule],
  templateUrl: './returned-bills.component.html',
  styleUrl: './returned-bills.component.scss'
})
export class ReturnedBillsComponent implements OnInit{



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
  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private location: Location) {}



  ngOnInit() {

    this.loadBills({ first: 0, rows: 20 });
  }

  loadBills(event: any) {
    this.isLoading = true;
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
    let url = `billing/returned-bills/${this.limit}/${this.skip}`;
    this.apiService.get(url).subscribe((result:any)=>{
      this.billList = result.data;
      this.total = result.total;
      this.isLoading = false;
    },error => {
      this.errorBag = error.message
      this.isLoading = false;
      //this.loading = true;
    })


  }

  goBack(): void {
    this.location.back();
  }

}
