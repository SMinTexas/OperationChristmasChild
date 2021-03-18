import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';

import { Category } from 'src/app/_models/category';
import { Inventory } from 'src/app/_models/inventory';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CategoryService } from 'src/app/_services/category.service';
import { InventoryService } from 'src/app/_services/inventory.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  @Output() cancelAddInventory = new EventEmitter();
  categoryRows: Category[] = [];
  inventoryRow: Inventory = new Object() as Inventory;
  user: User;

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private inventoryService: InventoryService,
    private messageService: MessageService) {
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
      this.messageService.addInventorySuccessMsg(this.inventoryRow.item);
      this.cancel();
    }, error => {
      this.messageService.addInventoryErrorMsg(error);
    })    
  }

  cancel()
  {
    this.cancelAddInventory.emit(false);
  }

}
