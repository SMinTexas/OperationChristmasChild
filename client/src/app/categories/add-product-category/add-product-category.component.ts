import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {
  @Output() cancelAddCategory = new EventEmitter();
  model: any = {};
  toastrTitle: string = "Add a New Product Category";
  successMsg: string = "";
  errorMsg: string = "";

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void { }

  addCategory()
  {
    console.log("HOWDY AGGIES");
    this.successMsg = "New Product Category - " + this.model.category + " - successfully added.";
    this.toastr.success(this.successMsg,this.toastrTitle);
    this.cancel();
  }

  cancel()
  {
    this.cancelAddCategory.emit(false);
  }

}
