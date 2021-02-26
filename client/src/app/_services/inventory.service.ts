import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Age } from '../_models/age';
import { Category } from '../_models/category';
import { Gender } from '../_models/gender';

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

  getAges(model: any)
  {
    return this.http.get<Age>(this.baseUrl + 'ages', model);
  }

  getGenders(model: any)
  {
    return this.http.get<Gender>(this.baseUrl + 'genders', model);
  }
}
