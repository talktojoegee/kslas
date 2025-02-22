import {Component, OnInit} from '@angular/core';
import {LGA} from "../../../models/class/LGA";
import {environment} from "../../../../environments/environment.development";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, Location} from "@angular/common";
import {CardComponent} from "../../../theme/shared/components/card/card.component";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-system-users',
  imports: [RouterLink, CommonModule, CardComponent, TableModule, Button,
    IconFieldModule, InputIconModule, MultiSelectModule, PaginatorModule, ToastModule, ReactiveFormsModule],
  templateUrl: './system-users.component.html',
  styleUrl: './system-users.component.scss',
  providers:[MessageService]
})
export class SystemUsersComponent implements OnInit{

  title : string = "System Users";
  lgaObj : LGA = new LGA();
  lgaList: any [] = [];
  sectorList: any [] = [];
  errorBag: any[] = [];
  isLoading: boolean;
  skip: 0;
  limit: 0;
  userList: any [] = [];
  roleList: any [] = [];
  classList: any [] = [];
  total: 0;
  private baseUrl : string = environment.BASE_URL;

  isFormSubmitted: boolean = false;

  lgaHandler: any = {
    lgaName: '',
  };
  lgaForm: FormGroup = new FormGroup({
    lgaName: new FormControl("", [Validators.required]),
  });
  formValue: any;

  form:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl("", [Validators.required]),
    mobileNo: new FormControl("",[Validators.required]),
    username: new FormControl("",[Validators.required]),
    idNo: new FormControl(""),
    lga: new FormControl(""),
    actionedBy: new FormControl(""),
    sector: new FormControl("", [Validators.required]),
    role: new FormControl(1, [Validators.required]),
  });

  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private location: Location,
              public router: Router,
              ) {}

  ngOnInit() {
    this.loadAdminUsers({ first: 0, rows: 20 });
    this.loadRoles();
    this.loadSectors();
    this.loadClasses();
    this.loadLGAs();

    this.form.get("role")?.valueChanges.subscribe((selectedRole)=>{
      const lgaControl = this.form.get("lga");
        if(selectedRole === 6){
          lgaControl?.setValidators([Validators.required]);
        }else{
          lgaControl?.clearValidators();
          lgaControl?.setValue('');
        }
      lgaControl?.updateValueAndValidity();
    });

  }


  loadClasses(){
    this.apiService.get(`property-classification/all`).subscribe((result:any)=>{
      this.classList = result.data;
    },error => {
      this.errorBag = error.message
      //console.log(this.errorBag)
    })

  }

  loadAdminUsers(event: any) {
    this.isLoading = true;
    this.skip = event.first || 0;
    this.limit = event.rows || 0;
    const type = 1;
    let url = `users/all/${type}/${this.limit}/${this.skip}`;
    this.apiService.get(url).subscribe((result:any)=>{
      this.userList = result.data;
      this.total = result.total;
      this.isLoading = false;
      //this.loading = true;
    },error => {
      this.errorBag = error.message
      this.isLoading = false;
      //this.loading = true;
    })


  }

  loadLGAs(){
    this.apiService.get(`lga/all`).subscribe((result:any)=>{
      this.lgaList = result.data;
    },error => {
      this.errorBag = error.message
    })

  }

  exportFile(){

    this.isFormSubmitted = true;
    this.formValue = this.lgaForm.value;
    this.apiService.downloadFile(`export-bills`).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: 'New record added to the system.'
      });
    },error=>{
      this.isFormSubmitted = false;
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

  goBack(): void {
    this.location.back();
  }
  loadRoles(){
    this.apiService.get(`access/roles/all`).subscribe((result:any)=>{
      this.roleList = result.data;
    },error => {
      this.errorBag = error.message

    })
  }
  loadSectors(){
    this.apiService.get(`sectors/distinct`).subscribe((result:any)=>{
      result.data.map((sector)=>{
        const obj = {
          name:sector.sector,
          value:sector.sector,
        }
        this.sectorList.push(obj)
      });

    },error => {
      this.errorBag = error.message

    })
  }

  handleNewUserSubmission(){
    this.isFormSubmitted = true;
    this.formValue = this.form.value;
    this.apiService.post(`add-new-user`,this.formValue).subscribe((res:any)=>{
      this.isFormSubmitted = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Action successful',
        detail: "New record added"
      });
      this.delayAndRedirect("/settings/system-users");
      this.loadAdminUsers({ first: 0, rows: 20 });

    },error=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Whoops!',
        detail: "Something went wrong."
      });
      this.isFormSubmitted = false;
    })
  }

  delayAndRedirect(url) {
    setTimeout(() => {
      this.router.navigateByUrl(url).then(r => {});
    }, 1000);
  }

}
