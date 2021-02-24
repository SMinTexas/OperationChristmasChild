import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  addCategoryMode = false;
  categories: any;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService, private router: Router) 
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void 
  { 
    this.getCategories();
  }

  getCategories()
  {
    this.http.get(this.baseUrl + 'categories').subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
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

}
