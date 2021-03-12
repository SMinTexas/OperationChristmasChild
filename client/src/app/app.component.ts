import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Operation Christmas Child';
  users: any;

  constructor(private accountService: AccountService, private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
    this.setCurrentUser();
    this.primengConfig.ripple = true;
  }

  setCurrentUser()
  {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }

}
