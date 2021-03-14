import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { Category } from 'src/app/_models/category';
import { Inventory } from 'src/app/_models/inventory';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CategoryService } from 'src/app/_services/category.service';
import { InventoryService } from 'src/app/_services/inventory.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  @Output() cancelAddInventory = new EventEmitter();
  user: User;
  categoryRows: Category[] = [];
  inventoryRow: Inventory = new Object() as Inventory;
  toastrTitle: string = "Add a New Inventory Item";
  successMsg: string = "";
  errorMsg: string = "";

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private inventoryService: InventoryService,
    private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
     }

  ngOnInit(): void 
  { 
    this.getAllProductCategories();
  }

  getAllProductCategories()
  {
    this.categoryService.getAllProductCategories().subscribe((response: Category[]) => {
      this.categoryRows = response;
    })
  }

  addInventoryItem()
  {
    this.inventoryRow.appUserId = this.user.appUserId;
    this.inventoryService.addInventory(this.inventoryRow).subscribe(response => {
      this.successMsg = "New Item - " + this.inventoryRow.item + " - successfully added to your inventory.";
      this.toastr.success(this.successMsg,this.toastrTitle);
      this.cancel();
    }, error => {
      console.log(error);
      this.errorMsg = error.url + " http response code " + error.status;
      this.toastr.error(error.error, this.errorMsg);
    })    
  }

  cancel()
  {
    this.cancelAddInventory.emit(false);
  }

}
