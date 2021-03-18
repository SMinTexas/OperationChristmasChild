import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {
  @Output() cancelAddCategory = new EventEmitter();
  categoryRow: Category = new Object() as Category;

  constructor(
      private categoryService: CategoryService,
      private messageService: MessageService) { }

  ngOnInit(): void { }

  addCategory()
  {
    this.categoryService.addCategory(this.categoryRow).subscribe(response => {
      this.messageService.addCategorySuccessMsg(this.categoryRow.category)
      this.cancel();
    }, error => {
      this.messageService.addCategoryErrorMsg(error);
    })
  }

  cancel()
  {
    this.cancelAddCategory.emit(false);
  }

}
