import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { InventoryService } from 'src/app/_services/inventory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  baseUrl = environment.apiUrl;
  categories: any;
  model: any;
  user: User;
  errorMsg: string = "";
  addInventoryMode = false;

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
    this.getCategories();
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

  cancel()
  {
    this.router.navigateByUrl('/dashboard');
  }

  addInventoryToggle()
  {
    this.addInventoryMode = !this.addInventoryMode;
    console.log('Have just updated this.addInventoryMode to ',this.addInventoryMode);
  }

  cancelAddInventoryMode(event: boolean)
  {
    this.addInventoryMode = event;
  }
}
