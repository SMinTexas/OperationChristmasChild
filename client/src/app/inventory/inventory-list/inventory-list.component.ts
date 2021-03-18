import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { Category } from 'src/app/_models/category';
import { Inventory } from 'src/app/_models/inventory';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CategoryService } from 'src/app/_services/category.service';
import { InventoryService } from 'src/app/_services/inventory.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  addInventoryMode = false;
  categoryRows: Category[] = [];
  clonedInventory: { [s: string]: Inventory; } = {};
  productInventory: Inventory[];
  rowGroupMetaData: any;
  user: User;

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private inventoryService: InventoryService,
    private messageService: MessageService,
    private router: Router) 
  { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void 
  {
    this.getAllProductCategories();
    this.getProductInventories(this.user.appUserId);
    this.updateRowGroupMetaData();
  }

  cancel()
  {
    this.router.navigateByUrl('/dashboard');
  }

  onSort()
  {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData()
  {
    this.rowGroupMetaData = {};

    if (this.productInventory)
    {
      for (let i = 0; i < this.productInventory.length; i++)
      {
        let rowData = this.productInventory[i];
        let categoryName = rowData.category;

        if (i == 0)
        {
          this.rowGroupMetaData[categoryName] = { index: 0, size: 1 };
        }
        else
        {
          let previousRowData = this.productInventory[i - 1];
          let previousRowGroup = previousRowData.category;
          if (categoryName == previousRowGroup)
            this.rowGroupMetaData[categoryName].size++;
          else  
            this.rowGroupMetaData[categoryName] = { index: i, size: 1 };
        }
      }
    }
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

  getAllProductCategories()
  {
    this.categoryService.getAllProductCategories().subscribe((response: Category[]) => {
      this.categoryRows = response;
    })
  }

  onRowEditInit(inventory: Inventory)
  {
    this.clonedInventory[inventory.inventoryId] = {...inventory}
  }

  onRowEditSave(inventory: Inventory)
  {
    this.inventoryService.updateInventory(inventory.inventoryId, inventory).subscribe(() => {
      delete this.clonedInventory[inventory.inventoryId];
      this.messageService.updateInventorySuccessMsg(inventory.item);
    }, error => {
      this.messageService.updateInventoryErrorMsg(error);
    })
  }

  onRowEditCancel(inventory: Inventory, index: number)
  {
    this.productInventory[index] = this.clonedInventory[inventory.inventoryId];
    delete this.clonedInventory[inventory.inventoryId];
  }

  handleRefresh(event)
  {
    this.getAllProductCategories();
    this.getProductInventories(this.user.appUserId);
    this.updateRowGroupMetaData();
  }
}
