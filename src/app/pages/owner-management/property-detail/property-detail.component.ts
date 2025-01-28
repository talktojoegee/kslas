import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {ToastModule} from "primeng/toast";
import {CommonModule, Location} from "@angular/common";
import {Button} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-property-detail',
  imports: [CardComponent,RouterLink, ToastModule, CommonModule,  Button, ReactiveFormsModule,  ToastModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
  providers: [MessageService]
})
export class PropertyDetailComponent implements OnInit{

  propertyId:number = 0;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private location:Location) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = parseInt(params.get('id'));
      //this.propertyId = this.route.snapshot.paramMap.get('id') || '';
      //this.loadBill();
    });
  }

}
