import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';


  @Injectable({
    providedIn: 'root'
  })
export class CategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addCategory(model: Category)
  {
    return this.http.post<Category>(this.baseUrl + 'categories/add', model);
  }

  updateCategory(id: number, category: Category)
  {
    return this.http.put(this.baseUrl + 'categories/' + id, category);
  }

  getProductCategory(pc: string)
  {
    return this.http.get<Category>(this.baseUrl + 'categories/' + pc);
  }

  getProductCategories()
  {
    return this.http.get(this.baseUrl + 'categories')
      .toPromise()
      .then(res => <Category[]> res)
      .then(data => { return data })
  }

  getAllProductCategories(): Observable<Category[]> 
  {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

}
