import { Component } from '@angular/core';
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
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-review-special-interest-bill',
  imports: [RouterLink, CommonModule, CardComponent, TableModule, Button,
    IconFieldModule, InputIconModule, PaginatorModule, ToastModule],
  templateUrl: './review-special-interest-bill.component.html',
  styleUrl: './review-special-interest-bill.component.scss',
  providers:[MessageService]
})
export class ReviewSpecialInterestBillComponent {





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
  selectedBills: any[] = [];
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
    const status = 0;
    let authUser = this.apiService.getItem('uuid');
    let url = `billing/special-interest-bills/${authUser}/${this.limit}/${this.skip}/${status}`;
    this.apiService.get(url).subscribe((result:any)=>{
      this.billList = result.data;
      this.total = result.total;
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


  onSelectChange(event:Event){
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.limit = Number(selectedValue);
    this.loadBills({ first: 0, rows: this.limit })
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedBills = [...this.billList]; // Select all
    } else {
      this.selectedBills = []; // Deselect all
    }
  }

  toggleSelection(item: any, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedBills.push(item);
    } else {
      this.selectedBills = this.selectedBills.filter(bill => bill !== item);
    }
  }

  getSelectedBillIds(): number[] {
    return this.selectedBills.map(bill => bill.billId);
  }

  reviewAll() {
    let ids = this.getSelectedBillIds();
    let url = `billing/bills/bulk-action`;
    let authUser = this.apiService.getItem('uuid');
    this.apiService.post(url,{ids,action:'review', actionedBy:authUser}).subscribe((result:any)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Great!',
        detail: "Action successful"
      });
      this.isLoading = false;
      this.selectedBills = [];
      this.loadBills({ first: 0, rows: this.limit })

    },error => {
      this.errorBag = error.message
      this.isLoading = false;

    })
  }

}
