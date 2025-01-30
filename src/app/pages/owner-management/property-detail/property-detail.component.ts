import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {ToastModule} from "primeng/toast";
import {CommonModule, Location} from "@angular/common";
import {Button} from "primeng/button";
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from "@angular/forms";
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
  isFormSubmitted: boolean = false;
  propertyId:number = 0;
  kgtin:string = '';
  record:any ;
  owner:any ;
  formValue:any ;
  errorFlag: number = 0;
  form:FormGroup = new FormGroup({
    kgtin: new FormControl('', [Validators.required]),
    name: new FormControl("", [Validators.required]),
    mobileNo: new FormControl("",[Validators.required]),
    id: new FormControl("",[Validators.required]),
    addedBy: new FormControl("",[Validators.required]),
    propertyId: new FormControl("",[Validators.required]),
    email: new FormControl(""),
  });

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private location:Location) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = parseInt(params.get('id'));
      //this.propertyId = this.route.snapshot.paramMap.get('id') || '';
      this.loadPropertyDetails();
    });
  }

  loadPropertyDetails(){
    this.apiService.get(`property/${this.propertyId}`).subscribe((result:any)=>{
      this.kgtin = result.data.kgTin;
      this.record = result.data;
      this.loadOwnerInfo();
    },error => {

    })
  }

  loadOwnerInfo(){
    this.apiService.get(`owners/${this.kgtin}`).subscribe((result:any)=>{
      this.owner = result.data;
      const defaultValues = {
        id:this.owner?.id,
        kgtin:this.owner?.kgtin,
        name:this.owner?.name,
        mobileNo:this.owner?.telephone,
        email:this.owner?.email,
        propertyId:this.propertyId,
        addedBy: this.apiService.getItem('uuid'),
      };

      this.form.setValue(defaultValues);
    },error => {
      //this.errorFlag = 1;
    });
  }

  handleOwnerChanges(){
    this.formValue = this.form.value;
    this.apiService.post(`owners/save-changes`,this.formValue).subscribe((result:any)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "Changes saved."
      });
    },error => {
      //this.errorFlag = 1;
    });
  }
  goBack():void{
    this.location.back();
  }
}
