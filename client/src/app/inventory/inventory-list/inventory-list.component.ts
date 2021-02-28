import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Inventory } from 'src/app/_models/inventory';
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
  ages: any;
  genders: any;
  model: any;
  user: User;
  errorMsg: string = "";
  addInventoryMode = false;

  productInventories: Inventory[];

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
    // this.getAges();
    this.getProductInventories();
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

  // getAges()
  // {
  //   this.inventoryService.getAges(this.model).subscribe(response => {
  //     this.ages = response;
  //     console.log('inventory-list component this.ages = ', this.ages);
  //   }, error => {
  //     this.errorMsg = error.url + ' https response code ' + error.status;
  //     this.toastr.error(error.error, this.errorMsg);
  //   })
  // }

  cancel()
  {
    this.router.navigateByUrl('/dashboard');
  }

  addInventoryToggle()
  {
    this.addInventoryMode = !this.addInventoryMode;
  }

  cancelAddInventoryMode(event: boolean)
  {
    this.addInventoryMode = event;
  }

  //this code is for primeng
  getProductInventories()
  {
    this.inventoryService.getProductInventories().then(data => this.productInventories = data);
  }



  //the below code is for ag-grid - not real happy with its implementation
  // columnDefs = 
  // [
  //   // headerName: 'Category Group',  //this is not implemented correctly, did not like this for unknown reason
  //   // children: [
  //   //   {headerName: 'Product Category', field: 'Category', sortable: true, filter: true, type: 'right Aligned', rowGroup: true}
  //   // ],
  //   {headerName: 'Product Category',field: 'Category', sortable: true, filter: true, type: 'rightAligned', width: 150, rowGroup: true, rowGroupColumn: 'Category'},
  //   {headerName: 'Age Group', field: 'AgeGroup', sortable: true, filter: true, type: 'rightAligned', width:110},
  //   {headerName: 'Gender', field: 'Gender', sortable: true, filter: true, type: 'rightAligned', width: 100},
  //   {headerName: 'Item Name',field: 'Name', sortable: true, filter: true, resizable: true, type: 'rightAligned'},
  //   {headerName: 'Item Price',field: 'Price', sortable: true, filter: true, type: 'rightAligned', width: 110},
  //   {headerName: 'Item Count',field: 'Count', sortable: true, filter: true, type: 'numericColumn', width: 110},
  //   {headerName: 'Item Description', field: 'Desc', type: 'rightAligned', width: 300},
  //   {headerName: 'Best Price Paid', field: 'Best', sortable: true, type: 'numericColumn', width: 130},
  //   {headerName: 'Last Purchased', field: 'Date', sortable: true, filter: true, type: 'rightAligned', width: 130},
  //   {headerName: 'Item Notes', field: 'Notes', type: 'rightAligned', width: 500}
  // ]

  // rowData =
  // [
  //   {Category: 'Clothing', AgeGroup: '5 - 9', Gender: 'Girl', Name: 'Shorts', Price: 0.75, Count: 200, Desc: 'Pink shorts with pockets', Best: 0.15, Date: '2020-10-15', Notes:'WalMart deal when manager let me talk him down'},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Lined Paper', Price: 0.10, Count: 5000, Desc: 'Wide-ruled single sheets of notebook paper', Best: 0.10, Date: '2020-01-10', Notes:''},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Ball Point Pen', Price: 0.05, Count: 2500, Desc: 'Medium point blue ink', Best: 0.05, Date: '2020-01-10', Notes: ''},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Ball Point Pen', Price: 0.05, Count: 350, Desc: 'Medium point red ink', Best: 0.05, Date: '2020-01-10', Notes: ''},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Ball Point Pen', Price: 0.05, Count: 1600, Desc: 'Medium point black ink', Best: 0.05, Date: '2020-10-10', Notes: ''},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Boy', Name: 'Ball', Price: 0.01, Count: 25, Desc: 'Bright colored rubber', Best: 0.01, Date: '2019-06-09', Notes: ''},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Boy', Name: 'Airplane', Price: 0.25, Count: 10, Desc: 'Bright colored plastic', Best: 0.25, Date: '2021-02-01', Notes:'Non-flying'},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Girl', Name: 'Doll', Price: 1.25, Count: 15, Desc: 'Girl doll with clothes', Best: 1.25, Date: '2021-02-28', Notes: 'Haggled deal at WalMart'},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Girl', Name: 'Frog', Price: 0.01, Count: 150, Desc: 'Green plastic', Best: 0.01, Date: '2020-12-16',Notes:'Push legs and they jump'},
  //   {Category: 'Art Supplies', AgeGroup: '5 - 9', Gender: 'Either', Name: 'Crayons', Price: 0.50, Count: 2400, Desc: '24-ct',Best: 0.25, Date: '2020-07-25', Notes: ''},
  //   {Category: 'Art Supplies', AgeGroup: '5 - 9', Gender: 'Either', Name: 'Markers', Price: 0.50, Count: 150, Desc: '12-ct',Best: 0.50, Date: '2021-01-17', Notes:'Deal found at a random stop while driving to Lake Jackson'},
  //   {Category: 'Art Supplies', AgeGroup: '5 - 9', Gender: 'Either', Name: 'Paper', Price: 0.10, Count: 250, Desc: 'Blank white',Best: 0.10, Date: '2020-03-18', Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '2 - 4', Gender: 'Girl', Name: 'Toothbrush', Price: 0.05, Count: 25, Desc: 'Disney Princess theme',Best: 0.05, Date:'2020-04-28',Notes:'Ariel, Belle, and Cinderella'},
  //   {Category: 'Hygiene', AgeGroup: '2 - 4', Gender: 'Boy', Name: 'Toothbrush', Price: 0.05, Count: 25, Desc: 'Avengers theme',Best: 0.05, Date:'2020-04-28',Notes:'Captain America, Iron Man, and Thor'},
  //   {Category: 'Hygiene', AgeGroup: '5 - 9', Gender: 'Girl', Name: 'Hair brush', Price: 1.00, Count: 10, Desc: 'Pink handle',Best: 1.00, Date: '2020-12-18',Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '5 - 9', Gender: 'Boy', Name: 'Nail Clippers', Price: 0.99, Count: 5, Desc: 'Chrome with rubber grips',Best:0.99,Date:'2021-01-27',Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '10 - 14', Gender: 'Girl', Name: 'Pads', Price: 0.01, Count: 25, Desc: 'Home made',Best:0.01,Date:'2021-01-31',Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '10 - 14', Gender: 'Boy', Name: 'Comb', Price: 0.05, Count: 60, Desc: 'Black plastic',Best:0.05,Date:'2021-01-27',Notes:''},
  //   {Category: 'Clothing', AgeGroup: '5 - 9', Gender: 'Girl', Name: 'Shorts', Price: 0.75, Count: 200, Desc: 'Pink shorts with pockets', Best: 0.15, Date: '2020-10-15', Notes:'WalMart deal when manager let me talk him down'},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Lined Paper', Price: 0.10, Count: 5000, Desc: 'Wide-ruled single sheets of notebook paper', Best: 0.10, Date: '2020-01-10', Notes:''},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Ball Point Pen', Price: 0.05, Count: 2500, Desc: 'Medium point blue ink', Best: 0.05, Date: '2020-01-10', Notes: ''},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Ball Point Pen', Price: 0.05, Count: 350, Desc: 'Medium point red ink', Best: 0.05, Date: '2020-01-10', Notes: ''},
  //   {Category: 'School Supplies', AgeGroup: '10 - 14',Gender: 'Either', Name: 'Ball Point Pen', Price: 0.05, Count: 1600, Desc: 'Medium point black ink', Best: 0.05, Date: '2020-10-10', Notes: ''},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Boy', Name: 'Ball', Price: 0.01, Count: 25, Desc: 'Bright colored rubber', Best: 0.01, Date: '2019-06-09', Notes: ''},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Boy', Name: 'Airplane', Price: 0.25, Count: 10, Desc: 'Bright colored plastic', Best: 0.25, Date: '2021-02-01', Notes:'Non-flying'},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Girl', Name: 'Doll', Price: 1.25, Count: 15, Desc: 'Girl doll with clothes', Best: 1.25, Date: '2021-02-28', Notes: 'Haggled deal at WalMart'},
  //   {Category: 'Toys', AgeGroup: '2 - 4', Gender: 'Girl', Name: 'Frog', Price: 0.01, Count: 150, Desc: 'Green plastic', Best: 0.01, Date: '2020-12-16',Notes:'Push legs and they jump'},
  //   {Category: 'Art Supplies', AgeGroup: '5 - 9', Gender: 'Either', Name: 'Crayons', Price: 0.50, Count: 2400, Desc: '24-ct',Best: 0.25, Date: '2020-07-25', Notes: ''},
  //   {Category: 'Art Supplies', AgeGroup: '5 - 9', Gender: 'Either', Name: 'Markers', Price: 0.50, Count: 150, Desc: '12-ct',Best: 0.50, Date: '2021-01-17', Notes:'Deal found at a random stop while driving to Lake Jackson'},
  //   {Category: 'Art Supplies', AgeGroup: '5 - 9', Gender: 'Either', Name: 'Paper', Price: 0.10, Count: 250, Desc: 'Blank white',Best: 0.10, Date: '2020-03-18', Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '2 - 4', Gender: 'Girl', Name: 'Toothbrush', Price: 0.05, Count: 25, Desc: 'Disney Princess theme',Best: 0.05, Date:'2020-04-28',Notes:'Ariel, Belle, and Cinderella'},
  //   {Category: 'Hygiene', AgeGroup: '2 - 4', Gender: 'Boy', Name: 'Toothbrush', Price: 0.05, Count: 25, Desc: 'Avengers theme',Best: 0.05, Date:'2020-04-28',Notes:'Captain America, Iron Man, and Thor'},
  //   {Category: 'Hygiene', AgeGroup: '5 - 9', Gender: 'Girl', Name: 'Hair brush', Price: 1.00, Count: 10, Desc: 'Pink handle',Best: 1.00, Date: '2020-12-18',Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '5 - 9', Gender: 'Boy', Name: 'Nail Clippers', Price: 0.99, Count: 5, Desc: 'Chrome with rubber grips',Best:0.99,Date:'2021-01-27',Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '10 - 14', Gender: 'Girl', Name: 'Pads', Price: 0.01, Count: 25, Desc: 'Home made',Best:0.01,Date:'2021-01-31',Notes:''},
  //   {Category: 'Hygiene', AgeGroup: '10 - 14', Gender: 'Boy', Name: 'Comb', Price: 0.05, Count: 60, Desc: 'Black plastic',Best:0.05,Date:'2021-01-27',Notes:''}
  // ]

  // myColumnDefs = 
  // [
  //   {field: 'Category', sortable: true, filter: true},
  //   {field: 'Name', sortable: true, filter: true},
  //   {field: 'Price', sortable: true, filter: true},
  //   {field: 'Count', sortable: true, filter: true}
  // ]

  // myRowData =
  // [
  //   {Category: 'Clothing', Name: 'Shorts', Price: 0.75, Count: 200},
  //   {Category: 'School Supplies', Name: 'Lined Paper', Price: 0.10, Count: 5000},
  //   {Category: 'School Supplies', Name: 'Blue Ball Point Pen', Price: 0.05, Count: 2500}
  // ]


}
