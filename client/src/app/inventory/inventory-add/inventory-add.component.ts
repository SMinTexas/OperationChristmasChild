import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Age } from 'src/app/_models/age';
import { Category } from 'src/app/_models/category';
import { Gender } from 'src/app/_models/gender';
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
      //console.log('CATEGORIES: ', this.categories);
    }, error => {
      this.errorMsg = error.url + ' http response code ' + error.status;
      this.toastr.error(error.error, this.errorMsg);
    })
  }

  getAges()
  {
    this.inventoryService.getAges(this.model).subscribe(response => {
      this.ages = response;
      //console.log("AGES: ", this.ages);
    }, error => {
      this.errorMsg = error.url + ' http response code ' + error.status;
      this.toastr.error(error.error, this.errorMsg);
    })
  }

  getGenders()
  {
    this.inventoryService.getGenders(this.model).subscribe(response => {
      this.genders = response;
      //console.log('GENDERS: ',this.genders);
    }, error => {
      this.errorMsg = error.url + ' http response code ' + error.status;
      this.toastr.error(error.error, this.errorMsg);
    })
  }

  addInventoryItem()
  {
    // console.log("Age Record ID: ", this.ageRec.ageId);
    // console.log("Gender Record ID: ", this.genderRec.genderId);
    // console.log("Product Category Record ID: ", this.categoryRec.productCategoryId);
    // console.log("Gonna add something to the table OH MY!");
    // console.log("This should be the ProductCategoryId: ", this.categories.productCategoryId);
    // console.log("This should be the AgeId: ", this.ages.ageId);
    console.log("This should be the GenderId: ", this.genders.genderId);
    // console.log("This should be the Category: ", this.categories.category);
    // console.log("This should be the Age Range: ", this.ages.ageRange);
    console.log("This should be the Gender Type: ", this.genders.genderType);

    console.log('GenderID ?', this.genders.GenderId);
  }

  cancel()
  {
    this.cancelAddInventory.emit(false);
  }

}
