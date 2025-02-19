import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment.development";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {CommonModule, Location} from "@angular/common";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ToastModule} from "primeng/toast";
import {CardComponent} from "../../../../theme/shared/components/card/card.component";
import {Button} from "primeng/button";
declare var bootstrap: any;

@Component({
  selector: 'app-all-pending-bill-details',
  imports: [RouterLink, CommonModule,ToastModule, CardComponent,  Button, ReactiveFormsModule],
  templateUrl: './all-pending-bill-details.component.html',
  styleUrl: './all-pending-bill-details.component.scss'
})
export class AllPendingBillDetailsComponent implements OnInit {



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
  returned : number = 0;
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
  returnReason: string = '';
  balance: number = 0;
  special: number = 0;
  formValue: any;

  form:FormGroup = new FormGroup({
    lucAmount: new FormControl('', [Validators.required]),
    chargeRate: new FormControl("", [Validators.required]),
    assessedValue: new FormControl("",[Validators.required]),
    //action: new FormControl(""),
    billId: new FormControl(""),
    actionedBy: new FormControl(""),
  });

  returnForm:FormGroup = new FormGroup({
    reason: new FormControl("", [Validators.required])
  });

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              public router: Router,
              private location:Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
      this.returned = res.data.returned;
      this.special = res.data.special;

      this.propertyClass = res.data.class;
      this.occupancy = res.data.occupancy;
      this.returnReason = res.data.reason;

      this.balance = res.data.balance;
      this.lgaName =  res.data.lgaName;
      this.pavCode =  res.data.pavCode;
      this.zone =  res.data.zone;
      this.billedBy =  res.data.billedBy;
      this.statusInt =  res.data.statusInt;
      //load default values
      this.form.setValue({
        lucAmount:res.data?.billAmount || 0,
        chargeRate:res.data?.chargeRate || 0,
        assessedValue:res.data?.assessValue || 0,
        billId:res.data?.billId,
        actionedBy:this.apiService.getItem('uuid'),
      });
      console.log(this.form);

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




  toggleBillToSpecial(){
    let requestId = this.billId;
    const obj = {
      requestId:requestId,
      action:1,
      actionedBy:this.apiService.getItem('uuid')
    };
    this.isFormSubmitted = true;
    this.apiService.post(`billing/toggle-bill-type`,obj).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bill made of special interest!"
      });
      this.closeModal('verify');
      this.delayAndRedirect('/billings/all-pending-bills')


    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }



  toggleBillToNormal(){
    this.isFormSubmitted = true;
    let requestId = this.billId;
    const obj = {
      requestId,
      action:0,
      actionedBy:this.apiService.getItem('uuid')
    };
    this.apiService.post(`billing/toggle-bill-type`,obj).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Bill normalized!"
      });
      this.closeModal('authorize');
      this.delayAndRedirect('/billings/all-pending-bills')

    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }

  approveBill(){
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
      if(this.special === 0){
        this.delayAndRedirect('/billings/approve')
      }else{
        this.delayAndRedirect('/billings/special-interest/approve')
      }
      //this.delayAndRedirect('/billings/approve')
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


  handleBillChanges(){
    this.isFormSubmitted = true;
    this.formValue = this.form.value;
    this.apiService.post(`billing/update-bill-changes`,this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Changes saved"
      });
      this.closeModal('editBill');
      this.location.back();

    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }

}
