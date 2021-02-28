import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { InventoryService } from 'src/app/_services/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  addCategoryMode = false;
  categories: any;
  model: any = {};
  user: User;
  errorMsg: string = "";

  productCategories: Category[];


  constructor(
    private http: HttpClient, 
    private accountService: AccountService, 
    private inventoryService: InventoryService,
    private router: Router,
    private toastr: ToastrService) 
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void 
  { 
    // this.getCategories();
    this.getProductCategories();
  }

  // getCategories()
  // {
  //   this.inventoryService.getCategories(this.model).subscribe(response => {
  //     this.categories = response;
  //   }, error => {
  //     this.errorMsg = error.url + ' http response code ' + error.status;
  //     this.toastr.error(error.error, this.errorMsg);
  //   })
  // }

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

  getProductCategories()
  {
    this.inventoryService.getProductCategories().then(data => this.productCategories = data);
  }
}
