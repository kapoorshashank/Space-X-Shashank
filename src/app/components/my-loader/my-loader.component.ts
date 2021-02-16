// my-loader.component.ts
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/loader.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.css']
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;

  constructor(private loaderService: LoaderService) {
this.loaderService.isLoading.subscribe((data) => {
      this.loading = data;
    });

  }
  ngOnInit() {
  }

}
