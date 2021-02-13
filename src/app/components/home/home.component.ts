import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecordDetailsService } from 'src/app/shared/recordDetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/shared/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  years: Array<any>;
  rocketDetails = [];
  loader = true;
  queryParam = {
    limit: 100,
    launch_year: undefined,
    launch_success: undefined,
    land_success: undefined
  };

  constructor(private service: RecordDetailsService, private readonly location: Location) {
    this.years = new Array<any>(15).fill(0).map((ele, index) => 2006 + index);
  }

  ngOnInit() {
    // initial load of api
    this.service.getFilteredData('').subscribe((data) => {
    this.rocketDetails = data;
    });
  }

// filter function to get the filtered data
  filterFunc(key, value) {

    // query params
    if (this.queryParam[key] == value) {
      value = undefined;
    }
    this.queryParam[key] = value;

    const params = Object.keys(this.queryParam).map(key => {
      debugger;
      if (this.queryParam[key] !== undefined) {
        key = key + '=' + (this.queryParam[key] != undefined ? this.queryParam[key] : '');
        return key;
      }
    }).join('&');


    // passing query params to the service to get the filtered data
    this.service.getFilteredData(params).subscribe((data) => {
      this.rocketDetails = data;
      });
    this.location.go(params);
  }
}
