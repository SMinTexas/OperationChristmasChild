import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';

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

  constructor(
      private categoryService: CategoryService,
      private toastr: ToastrService) { }

  ngOnInit(): void { }

  addCategory()
  {
    this.categoryService.addCategory(this.model).subscribe(response => {
      this.successMsg = "New Product Category - " + this.model.category + " - successfully added.";
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
    this.cancelAddCategory.emit(false);
  }

}
