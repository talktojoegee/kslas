import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {LGAInterface} from '../models/interface/CommonInterface';
import {LGA} from '../models/class/LGA';

@Injectable({
  providedIn: 'root'
})
export class LgaService {
  private baseURL = environment.BASE_URL;



  constructor(private http: HttpClient) {

  }

  getAllLGAs():Observable<LGAInterface>{
    return this.http.get<LGAInterface>( `${this.baseURL}lgas/all`);
  }


  addLGA(obj:LGA):Observable<any>{
    //debugger;
    return this.http.post<any>(`${this.baseURL}lgas/add-lga`, obj);

  }


}
