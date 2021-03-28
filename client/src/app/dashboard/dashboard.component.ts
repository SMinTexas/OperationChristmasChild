import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Dashboard } from '../_models/dashboard';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  dashboardData: Observable<Dashboard[]>;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private accountService: AccountService,
    private dashboardService: DashboardService) 
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void
  {
    this.dashboardData = this.dashboardService.getDashboardData(this.user.appUserId);
  }

    /** Based on the screen size, switch from standard to one column per row */
    cardLayout = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
      map(({ matches }) => {
        if (matches) {
          return {
            columns: 1,
            miniCard: { cols: 1, rows: 1 },
            chart: { cols: 1, rows: 2 }
          };
        }
  
        return {
          columns: 5,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 5, rows: 2 }
        };
      })
    );
}
