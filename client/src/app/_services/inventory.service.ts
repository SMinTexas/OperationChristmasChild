import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(model: any) 
  {
    return this.http.get<Category>(this.baseUrl + 'categories', model);
  }

  addCategory(model: any)
  {
    return this.http.post<Category>(this.baseUrl + 'categories/add', model);
  }

}
