import { Component } from '@angular/core';
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {Location} from "@angular/common";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-make-payment',
  imports: [CardComponent],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss'
})
export class MakePaymentComponent {


  constructor(private apiService: ApiService, private route: ActivatedRoute, private location:Location) {
  }

  goBack(): void {
    this.location.back();
  }
}
