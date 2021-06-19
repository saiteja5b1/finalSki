import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseUri = environment.apiUrl;
  validationErrors:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUri + 'product/42').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error);
    })
  }
  get500Error(){
    this.http.get(this.baseUri + 'buggy/servererror').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error);
    })
  }
  get400Error(){
    this.http.get(this.baseUri + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error);
    })
  }
  get400ValidationError(){
    this.http.get(this.baseUri + 'products/fort').subscribe(response => {
      console.log(response);
    },error => {
      this.validationErrors = error.errors;
      console.log(error);
    })
  }

}
