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
  toastrTitle: string = "Add a New Product Category";
  warningMsg1: string = "Information:  ";
  warningMsg2: string = "You have made changes.  Any unsaved changes will be lost if you navigate away from this page.";

  productCategories: Category[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.addCategoryForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private http: HttpClient, 
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
      console.log('this.categoryRows = ', this.categoryRows);
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
      this.toastr.success(this.successMsg, this.toastrTitle);
      this.addCategoryForm.reset(this.categories);
    })
  }
}
