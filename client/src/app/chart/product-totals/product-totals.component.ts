import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { User } from 'src/app/_models/user';
import { Dashboard } from 'src/app/_models/dashboard';

@Component({
  selector: 'app-product-totals',
  templateUrl: './product-totals.component.html',
  styleUrls: ['./product-totals.component.css']
})
export class ProductTotalsComponent implements OnInit {
  @Input() data: Dashboard[];
  @Input() gender: string;
  @Input() ageRange: string;
  user: User;

  public pieChartOptions: ChartOptions = 
  {
    responsive: true
  };

  public pieChartLabels: Label[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartData: SingleDataSet = [];

  constructor() 
  {}

  ngOnInit(): void { }

  ngOnChanges(): void
  {
    this.getData();
  }

  getData()
  {
    if(this.data){
      var filteredData = this.data.filter(d => d.ageRange === this.ageRange && d.gender === this.gender);
      //check for empty filteredData
      var selectedData = filteredData[0].categories;
      selectedData.sort();//check this to see how to make it order by categories


      var labels: string[] = [];
      var chartData: number[] = [];

      selectedData.forEach(function (cat) {
        labels.push(cat.category);
        chartData.push(cat.totalCount);
      })
      this.pieChartLabels = labels;
      this.pieChartData = chartData;
    }
  }



}
