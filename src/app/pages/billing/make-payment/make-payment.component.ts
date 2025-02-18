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
  email:string = '';
  record:any;
  formValue:any;
  billId:number = 0;
  amount:number = 0;
  bbf : number = 0;
  name:string  = '';
  mobileNo:string = '';
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
      this.loadCredoScript();
    });
    this.initiateForm();
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
        console.log('Widget Closed');
      },
      callBack: (response: any) => {
        this.form.setValue({
          transRef:response.transRef,
          reference:response.reference,
          name:this.name || 'Customer Name',
          amountLabel:`${this.APP_CURRENCY}${this.amount.toLocaleString()}`,
          amount:this.amount,
          email:this.email,
          mobileNo:this.mobileNo,
          billId:this.billId,
          paidBy:this.apiService.getItem('uuid'),
        });
        this.handleSuccessfulPayment();
      }
    });
  }

  startPayment() {
    if (this.handler) {
      this.handler.openIframe();
    } else {
      //console.error('Payment handler not initialized');
    }
  }

  loadBill(){
    this.apiService.get(`billing/detail/${this.url}`).subscribe((res:any)=>{
      this.record = res.data;
      this.email = res.data?.ownerEmail || 'no-reply@kslas.com';
      this.mobileNo = res.data?.phoneNo || 234;
      this.name = res.data?.ownerName;
      this.amount = res.data?.billAmount;
      this.billId = res.data.billId;
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

        //this.delayAndRedirect('/billings/approve');

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
