import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  errorMsg: string = '';

  constructor(
    public accountService: AccountService, 
    private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void { }

  login() 
  {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/dashboard'); 
    }, error => {
      console.log(error);
      this.errorMsg = error.url + ' http status code: ' + error.status;
      this.toastr.error(error.error, this.errorMsg);
    })
  }

  logout() 
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
