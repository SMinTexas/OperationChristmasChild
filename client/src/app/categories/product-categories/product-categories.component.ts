import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/_models/user';
import { Category } from 'src/app/_models/category';
import { AccountService } from 'src/app/_services/account.service';
import { CategoryService } from 'src/app/_services/category.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  @ViewChild('addCategoryForm') addCategoryForm: NgForm;
  addCategoryMode = false;
  clonedProductCategory: { [s: string]: Category; } = {};
  categoryRows: Category[] = [];
  productCategories: Category[];
  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.addCategoryForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService, 
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router) 
  {
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

  cancel()
  {
    this.router.navigateByUrl('/dashboard');
  }

  addCategoryToggle()
  {
    this.addCategoryMode = !this.addCategoryMode;
  }

  cancelAddCategoryMode(event: boolean)
  {
    this.addCategoryMode = event;
  }

  handleRefresh(event)
  {
    this.getAllProductCategories();
  }

  onRowEditInit(category: Category)
  {
    this.clonedProductCategory[category.productCategoryId] = {...category}
  }

  onRowEditSave(category: Category)
  {
    this.categoryService.updateCategory(category.productCategoryId, category).subscribe(() => {
      delete this.clonedProductCategory[category.productCategoryId];
      this.messageService.updateCategorySuccessMsg(category.category);
    }, error => {
      this.messageService.updateCategoryErrorMsg(error);
    })
  }

  onRowEditCancel(category: Category, index: number)
  {
    this.categoryRows[index] = this.clonedProductCategory[category.productCategoryId];
    delete this.clonedProductCategory[category.productCategoryId];
  }
}
