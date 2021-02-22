import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get400Error()
  {
    this.http.get(this.baseUrl + 'error/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get400ValidationError()
  {
    this.http.post(this.baseUrl + 'account/register',{}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }

  get401Error()
  {
    this.http.get(this.baseUrl + 'error/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get404Error()
  {
    this.http.get(this.baseUrl + 'error/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get500Error()
  {
    this.http.get(this.baseUrl + 'error/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

}