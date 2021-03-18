import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';

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
    private messageService: MessageService, 
    private router: Router) { }

  ngOnInit(): void { }

  login() 
  {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/dashboard'); 
    }, error => {
      this.messageService.loginErrorMsg(error);
    })
  }

  logout() 
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
