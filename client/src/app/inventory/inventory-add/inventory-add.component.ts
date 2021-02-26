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
  ages: any;
  genders: any;
  toastrTitle: string = "Add a New Inventory Item";
  successMsg: string = "";
  errorMsg: string = "";


  constructor(
    private inventoryService: InventoryService,
    private toastr: ToastrService) { }

  ngOnInit(): void 
  { 
    this.getCategories();
    this.getAges();
    this.getGenders();
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

  getAges()
  {
    this.inventoryService.getAges(this.model).subscribe(response => {
      this.ages = response;
      console.log('inventory-add component this.age = ',this.ages);
    }, error => {
      this.errorMsg = error.url + ' http response code ' + error.status;
      this.toastr.error(error.error, this.errorMsg);
    })
  }

  getGenders()
  {
    this.inventoryService.getGenders(this.model).subscribe(response => {
      this.genders = response;
      console.log('inventory-add component this.genders = ', this.genders);
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
