import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../_models/category';
import { environment } from 'src/environments/environment';

  @Injectable({
    providedIn: 'root'
  })
export class CategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
 
  // httpHeader = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf-8'
  //   })
  // }

  getCategories(model: any) 
  {
    return this.http.get<Category>(this.baseUrl + 'categories', model);
  }
 
  // addCategory(model: any)
  // {
  //   return this.http.post<Category>(this.baseUrl + 'categories', JSON.stringify(model), this.httpHeader);
  // }
  addCategory(model: any)
  {
    return this.http.post<Category>(this.baseUrl + 'categories/add', model);
  }

  getProductCategories()
  {
    return this.http.get(this.baseUrl + 'categories')
      .toPromise()
      .then(res => <Category[]> res)
      .then(data => { return data })
  }

}
