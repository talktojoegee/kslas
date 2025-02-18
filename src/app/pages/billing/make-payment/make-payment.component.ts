import {Component, OnInit, Renderer2} from '@angular/core';
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {CommonModule, Location} from "@angular/common";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Angular4PaystackModule } from 'angular4-paystack';
import {environment} from "../../../../environments/environment.development";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-make-payment',
  imports: [CardComponent, Angular4PaystackModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss',
  providers: [MessageService]
})
export class MakePaymentComponent implements OnInit{

  APP_CURRENCY :string = environment.APP_CURRENCY;
  assessmentYear:number = new Date().getFullYear();
  isFormSubmitted: boolean = false;
  reference:string = '';
  title:string = '';
  url:string = '';
  email:any;
  record:any;
  formValue:any;
  billId:number = 0;
  amount:number = 0;
  bbf : number = 0;
  name:any;
  kgtin:any;
  mobileNo:any;




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
  statusInt : number = 0;

  returned : number = 0;

  propertyClass : string = '';
  occupancy : string = '';
  assessedValue: string = '';

  la:number = 0;
  lr:number = 0;
  ba:number = 0;
  br:number = 0;
  dr:number = 0;
  rr:number = 0;
  cr:number = 0;
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
  luc: number = 0;


  private handler: any;
  form!:FormGroup;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location:Location,
              private fb: FormBuilder,
              public router: Router,
              private messageService: MessageService,
              private renderer: Renderer2
              ) {
  }
  initiateForm(){
    this.form = this.fb.group({
      name: ["", Validators.required],
      mobileNo: ["", Validators.required],
      email: ["", Validators.required],
      amount: ["", Validators.required],
      billId: ["", Validators.required],
      paidBy: ["", Validators.required],
      amountLabel: [""],
      transRef: [""],
      reference: [""],
      kgtin: [""],
    });
  }
  goBack(): void {
    this.location.back();
  }

  delayAndRedirect(url) {
    setTimeout(() => {
      this.router.navigateByUrl(url).then(r => {});
    }, 1000);
  }

  paymentInit() {
    //console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successful';
    this.handleSuccessfulPayment();
    //console.log(this.title, ref);
  }

  paymentCancel() {
    //console.log('payment failed');
    this.messageService.add({
      severity: 'warn',
      summary: 'Whoops!',
      detail: "Payment failed. Try again"
    });
  }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.url = this.route.snapshot.paramMap.get('url') || '';
      this.loadBill();
      this.initiateForm();
      this.loadCredoScript();
    });

    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  loadCredoScript() {
    const script = this.renderer.createElement('script');
    script.src = "https://pay.credocentral.com/inline.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      this.initializeCredoWidget();
    };
    this.renderer.appendChild(document.body, script);
  }


  startPayment() {
    if (this.handler) {
      this.email = this.form.get("email").value;
      this.name = this.form.get("name").value;
      this.mobileNo = this.form.get("mobileNo").value;
      this.kgtin = this.form.get("kgtin").value;

      this.initializeCredoWidget();
      this.handler.openIframe();
    } else {
    }
  }

  initializeCredoWidget() {
    //let amount : number = 0;
    const generateRandomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min) + min);

    const transRef = `iy67f${generateRandomNumber(10, 60)}hvc${generateRandomNumber(10, 90)}`;
    let publishableKey = environment.CREDO_PUBLISHABLE_KEY;

    this.handler = (window as any).CredoWidget.setup({
      key: publishableKey,
      customerFirstName: this.name,
      customerLastName: this.name,
      email: this.email,
      amount: (this.amount * 100),
      currency: 'NGN',
      renderSize: 0,
      channels: ['card', 'bank'],
      reference: transRef,
      customerPhoneNumber: this.mobileNo,
      //callbackUrl: 'https://merchant-test-line.netlify.app/successful',
      onClose: () => {
        //console.log('Widget Closed');
      },
      callBack: (response: any) => {
        let email = this.form.get("email").value;
        let name = this.form.get("name").value;
        let mobileNo = this.form.get("mobileNo").value;
        let kgtin = this.form.get("kgtin").value;
        this.form.setValue({
          transRef:response.transRef,
          reference:response.reference,
          name:name || 'Customer Name',
          amountLabel:`${this.APP_CURRENCY}${this.amount.toLocaleString()}`,
          amount:this.amount,
          email:email,
          mobileNo:mobileNo,
          billId:this.billId,
          kgtin:kgtin,
          paidBy:this.apiService.getItem('uuid'),
        });
        this.handleSuccessfulPayment();
      }
    });
  }


  loadBill(){
    this.apiService.get(`billing/detail/${this.url}`).subscribe((res:any)=>{
      this.record = res.data;
      this.email = res.data?.ownerEmail || 'no-reply@kslas.com';
      this.mobileNo = res.data?.phoneNo || 234;
      this.name = res.data?.ownerName;
      this.amount = res.data?.billAmount;
      this.billId = res.data.billId;

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


      this.la = res.data.la;
      this.ba = res.data.ba;
      this.rr = res.data.rr;
      this.dr = res.data.dr;
      this.br = res.data.br;
      this.lr = res.data.lr;


      this.form.setValue({
        name:res.data.ownerName,
        amountLabel:`${this.APP_CURRENCY}${res.data.billAmount.toLocaleString()}`,
        amount:res.data.billAmount,
        email:this.email,
        mobileNo:this.mobileNo,
        billId:this.billId,
        paidBy:this.apiService.getItem('uuid'),
        transRef:'',
        reference:'',
        kgtin:res.data.kgTin
      })

    },error=>{

    })
  }


  handleSuccessfulPayment(){
      this.isFormSubmitted = true;
      this.formValue = this.form.value;
      this.apiService.post(`billing/make-payment`, this.formValue).subscribe((res:any)=>{
        this.isFormSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Action successful',
          detail: "Payment successful"
        });
        this.ngOnInit();
      },(error:any)=>{
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


}
