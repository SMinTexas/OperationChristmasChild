import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/_services/inventory.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  @Output() cancelAddInventory = new EventEmitter();
  model: any;
  categories: any;
  toastrTitle: string = "Add a New Inventory Item";
  successMsg: string = "";
  errorMsg: string = "";


  constructor(
    private inventoryService: InventoryService,
    private toastr: ToastrService) { }

  ngOnInit(): void 
  { 
    this.getCategories()
  }

  getCategories()
  {
    this.inventoryService.getCategories(this.model).subscribe(response => {
      this.categories = response;
    }, error => {
      this.errorMsg = error.url + ' http response code ' + error.status;
      this.toastr.error(error.error, this.errorMsg);
    })
  }

  addInventoryItem()
  {
    console.log("Gonna add something to the table OH MY!");
  }

  cancel()
  {
    this.cancelAddInventory.emit(false);
  }

}
