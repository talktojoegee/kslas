import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {ApiResponse} from '../models/interface/CommonInterface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  public baseUrl : string = environment.BASE_URL;

  constructor(private http: HttpClient) { }



  getData(page: number, perPage: number, search?: string, filters?: string[], orderBy?: string[]): Observable<ApiResponse<any>> {
    let url = `property-list/all?page${page}&perPage=${perPage}`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (filters && filters.length > 0) {
      filters.forEach(filter => {
        params = params.append('filter[]', filter);
      });
    }

    if (orderBy && orderBy.length > 0) {
      orderBy.forEach(order => {
        params = params.append('orderBy[]', order);
      });
    }
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/${url}`,{ params });
    /* return this.apiService.get(`property-assessment-value/all?page${page}&perPage=${perPage}`).subscribe((result:any)=>{
       this.pavList = result.data;
     },error => {
       this.errorBag = error.message
     })*/
  }
}
