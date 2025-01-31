import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, Location} from "@angular/common";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {delay} from "rxjs";
declare var bootstrap: any;

@Component({
  selector: 'app-bill-detail',
  imports: [RouterLink, CommonModule,ToastModule],
  templateUrl: './bill-detail.component.html',
  styleUrl: './bill-detail.component.scss',
  providers:[MessageService]
})
export class BillDetailComponent implements OnInit{



  APP_CURRENCY :string = environment.APP_CURRENCY;
  assessmentYear:number = new Date().getFullYear();

  // url: any = '';

  isFormSubmitted: boolean = false;
  ownerName:string = '';
  buildingCode:string = '';
  contactAddress:string = '';
  propertyClassification:string = '';
  kgTin:string = '';
  pavCode:string = '';
  entryDate:string = '';
  assessmentNo:string = '';
  propertyAddress:string = '';
  phoneNo:string = '';
  assessValue: number = 0;
  chargeRate:number = 0;
  url:string = 'default';
  statusInt : number = 0;
  billId : number = 0;
  propertyClass : string = '';
  occupancy : string = '';

  //buildingCode: string = '';
  //assessmentNo: string = '';
  assessedValue: string = '';
  zone: string = '';
  billAmount:number = 0;
  date: string = '';
  billedBy: string = '';
  paid:number = 0;
  paidAmount: number = 0;
  objection: number = 0;
  year: number = 0;
  lgaName: string = '';
  balance: number = 0;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              public router: Router,
              private location:Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.url = params.get('url');
      this.url = this.route.snapshot.paramMap.get('url') || '';
      this.loadBill();
    });
  }

  loadBill(){
    this.apiService.get(`billing/detail/${this.url}`).subscribe((res:any)=>{
      this.billId = res.data.billId;
      this.ownerName = res.data.ownerName;
      this.buildingCode = res.data.buildingCode;
      this.contactAddress = res.data.contactAddress;
      this.propertyClassification = res.data.propertyClassification;
      this.kgTin = res.data.kgTin;
      this.year = res.data.year;
      this.entryDate = res.data.entryDate;
      this.assessmentNo = res.data.assessmentNo;
      this.propertyAddress = res.data.propertyAddress;
      this.phoneNo = res.data.phoneNo;
      this.assessValue = res.data.assessValue;
      this.chargeRate = res.data.chargeRate;

      this.buildingCode = res.data.buildingCode;
      this.assessmentNo =  res.data.assessmentNo;
      this.assessedValue =  res.data.assessedValue;
      this.billAmount = res.data.billAmount;
      this.date =  res.data.date;
      this.paid = res.data.paid;
      this.paidAmount =  res.data.paidAmount;
      this.objection =  res.data.objection;
      this.assessmentYear =  res.data.year;
      this.url = res.data.url;

      this.propertyClass = res.data.class;
      this.occupancy = res.data.occupancy;

      this.balance = res.data.balance;
      this.lgaName =  res.data.lgaName;
      this.pavCode =  res.data.pavCode;
      this.zone =  res.data.zone;
      this.billedBy =  res.data.billedBy;
      this.statusInt =  res.data.statusInt;

    },error=>{

    })


  }


  goBack(): void {
    this.location.back();
  }



  exportToPDF(assessmentNo) {
    const element = document.getElementById('content-to-pdf'); // The section to convert

    if (!element) {
      //console.error('Content element not found');
      return;
    }
    element.style.display = 'block';

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      let fileName = 'BillAssessmentNo_'+assessmentNo+'.pdf'

      pdf.save(fileName);
      element.style.display = 'none';
    });
  }




  verifyObjection(){
    let requestId = this.billId;
    const obj = {
      requestId:requestId,
      action:1,
      actionedBy:this.apiService.getItem('uuid')
    };
    this.isFormSubmitted = true;
    this.apiService.post(`billing/action-bill`,obj).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bill verified"
      });
      this.closeModal('verify');
      this.delayAndRedirect('/billings/verify')
    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }



  declineObjection(){
    let requestId = this.billId;
    const obj = {
      requestId,
      action:5,
      actionedBy:this.apiService.getItem('uuid')
    };
    this.isFormSubmitted = true;
    this.apiService.post(`billing/action-bill`,obj).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bill verified"
      });
      this.closeModal('decline');
      this.delayAndRedirect('/billings/verify')
    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }

  authorizeObjection(){
    this.isFormSubmitted = true;
    let requestId = this.billId;
    const obj = {
      requestId,
      action:2,
      actionedBy:this.apiService.getItem('uuid')
    };
    this.apiService.post(`billing/action-bill`,obj).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bill authorized"
      });
      this.closeModal('authorize');
      this.delayAndRedirect('/billings/authorize')

    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }

  approveObjection(){
    this.isFormSubmitted = true;
    let requestId = this.billId;
    const obj = {
      requestId,
      action:3,
      actionedBy:this.apiService.getItem('uuid')
    };
    this.apiService.post(`billing/action-bill`,obj).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bill approved"
      });
      this.closeModal('approve');
      this.delayAndRedirect('/billings/approve')
    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })

  }


  numberToWords(amount) {
    const ones = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
    ];
    const teens = [
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
      "", "Ten", "Twenty", "Thirty", "Forty", "Fifty",
      "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    const thousands = ["", "Thousand", "Million", "Billion"];

    if (amount === 0) return "Zero";

    let word = "";

    function convertToWords(num, index) {
      if (num === 0) return "";

      let str = "";

      // Handle hundreds
      if (Math.floor(num / 100) > 0) {
        str += ones[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      // Handle tens and ones
      if (num > 10 && num < 20) {
        str += teens[num - 11] + " ";
      } else {
        if (Math.floor(num / 10) > 0) {
          str += tens[Math.floor(num / 10)] + " ";
        }
        if (num % 10 > 0) {
          str += ones[num % 10] + " ";
        }
      }

      return str + (num > 0 ? thousands[index] + " " : "");
    }

    let i = 0;
    while (amount > 0) {
      let chunk = amount % 1000; // Process in chunks of 3 digits
      if (chunk > 0) {
        word = convertToWords(chunk, i) + word;
      }
      amount = Math.floor(amount / 1000);
      i++;
    }

    return word.trim();
  }

  amountToWords(amount) {
    const [integerPart, decimalPart] = amount.toString().split(".");
    let words = this.numberToWords(parseInt(integerPart)) + " Naira";

    if (decimalPart) {
      const cents = parseInt(decimalPart.padEnd(2, "0")); // Ensure two decimal places
      if (cents > 0) {
        words += " and " + this.numberToWords(cents) + " kobo";
      }
    }

    return words;
  }


  closeModal(elementId) {
    const modalElement = document.getElementById(elementId);
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }

  delayAndRedirect(url) {
    setTimeout(() => {
      this.router.navigateByUrl(url).then(r => {});
    }, 1000);
  }

}
