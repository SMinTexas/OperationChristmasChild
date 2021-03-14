import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventory } from '../_models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductInventories(appUserId: number)
  {
    return this.http.get(this.baseUrl + 'inventories/' + appUserId)
      .toPromise()
      .then(res => <Inventory[]> res)
      .then(data => { return data })
  }

  addInventory(inventory: Inventory)
  {
    return this.http.post<Inventory>(this.baseUrl + 'inventories/add', inventory);
  }


}
