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
import {ToastModule} from "primeng/toast";
import {Roles} from "../../../../types";
import {RbacService} from "../../../../services/rbac.service";

@Component({
  selector: 'app-verify-bills',
  imports: [RouterLink, CommonModule, CardComponent, TableModule, Button,
    IconFieldModule, InputIconModule, PaginatorModule, ToastModule],
  templateUrl: './verify-bills.component.html',
  styleUrl: './verify-bills.component.scss',
  providers:[MessageService]
})
export class VerifyBillsComponent  implements OnInit{



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
              private rbacService: RbacService,
              private location: Location) {}



  ngOnInit() {

    this.loadBills({ first: 0, rows: 20 });

    /*if (this.rbacService.isGranted(Roles.ADMINISTRATOR)) {
      console.log('Access granted for administrator!');
    } else {
      console.log('Access denied for administrator!');
    }

    if (this.rbacService.isGranted(Roles.STAFF)) {
      console.log('Access granted for staff!');
    } else {
      console.log('Access denied for staff!');
    }

    if (this.rbacService.isGranted(Roles.USER)) {
      console.log('Access granted for user!');
    } else {
      console.log('Access denied for user!');
    }*/
  }

  loadBills(event: any) {
    this.isLoading = true;
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
    const status = 0;
    let authUser = this.apiService.getItem('uuid');
    let url = `billing/bills/${authUser}/${this.limit}/${this.skip}/${status}`;
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

  verifyAll() {
    let ids = this.getSelectedBillIds();
    let url = `billing/bills/bulk-action`;
    this.apiService.post(url,{ids,action:'verify'}).subscribe((result:any)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Great!',
        detail: "Action successful"
      });
      this.isLoading = false;
      this.loadBills({ first: 0, rows: this.limit })

    },error => {
      this.errorBag = error.message
      this.isLoading = false;

    })
  }


  downloadAttachment() {
    this.apiService.downloadFile(`export-bills`).subscribe((response)=>{
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
