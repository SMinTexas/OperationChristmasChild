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

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  @ViewChild('addCategoryForm') addCategoryForm: NgForm;
  baseUrl = environment.apiUrl;
  addCategoryMode = false;
  categories: any;
  categoryRows: Category[] = [];
  model: any = {};
  user: User;
  successMsg: string = "";
  errorMsg: string = "";
  toastrTitleAdd: string = "Add a New Product Category";
  toastrTitleUpdate: string = "Update a Product Category";
  warningMsg1: string = "Information:  ";
  warningMsg2: string = "You have made changes.  Any unsaved changes will be lost if you navigate away from this page.";

  productCategories: Category[];
  clonedProductCategory: { [s: string]: Category; } = {};

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.addCategoryForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService, 
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService) 
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

  addCategory()
  {
    this.categoryService.addCategory(this.categories).subscribe(() => {
      this.successMsg = "New Product Category - " + this.model.category + " - successfully added.";
      this.toastr.success(this.successMsg, this.toastrTitleAdd);
      this.addCategoryForm.reset(this.categories);
    }, error => {
      this.errorMsg = "New Product Category - " + this.model.category + " - failed for reason " + error.statusCode;
      this.toastr.error(this.errorMsg, "New Product Category Error");
    })
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
      this.successMsg = "Category " + category.category + " was successfully updated.";
      this.toastr.success(this.successMsg, this.toastrTitleUpdate);
    }, error => {
      this.errorMsg = "Update Product Category - " + this.model.category + " - failed for reason " + error.statusCode;
      this.toastr.error(this.errorMsg, "Update Product Category Error");
    })
  }

  onRowEditCancel(category: Category, index: number)
  {
    this.categoryRows[index] = this.clonedProductCategory[category.productCategoryId];
    delete this.clonedProductCategory[category.productCategoryId];
  }
}
