import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Inventory } from 'src/app/_models/inventory';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { InventoryService } from 'src/app/_services/inventory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  baseUrl = environment.apiUrl;
  categories: any;
  model: any;
  user: User;
  errorMsg: string = "";
  addInventoryMode = false;
  productInventory: Inventory[];
  lastPurchasedDateConverted: Date;

  constructor(
    private accountService: AccountService,
    private inventoryService: InventoryService,
    private router: Router,
    private toastr: ToastrService) 
  { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void 
  {
    this.getProductInventories(this.user.appUserId);
  }

  cancel()
  {
    this.router.navigateByUrl('/dashboard');
  }

  addInventoryToggle()
  {
    this.addInventoryMode = !this.addInventoryMode;
  }

  cancelAddInventoryMode(event: boolean)
  {
    this.addInventoryMode = event;
  }

  getProductInventories(appUserId: number)
  {
    this.inventoryService.getProductInventories(appUserId).then(data => this.productInventory = data);
  }
}
