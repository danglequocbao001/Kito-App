import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DioceseNewsService, DioceseService, IPageRequest } from 'src/app/@app-core/http';

@Component({
  selector: 'app-select-diocese',
  templateUrl: './select-diocese.page.html',
  styleUrls: ['./select-diocese.page.scss'],
})
export class SelectDiocesePage implements OnInit {
  headerCustom = {title: 'Chọn giáo phận'};
  list = [];
  notFound = false;
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 10
  }

  constructor(
    private router: Router,
    private dioceseService: DioceseService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.notFound = false;
    this.dioceseService.getAll(this.pageRequest).subscribe(data => {
      this.notFound = true;
      this.list = data.dioceses;
    })
  }
  search(value: string) {
    if (typeof value != 'string') {
      return;
    }
    else if (!value) {
      delete this.pageRequest.search;
    }
    else {
      this.pageRequest.search = value;
    }
    this.reset();
    this.getData();
  }
  reset() {
    this.list = [];
    this.pageRequest.page = 1;
  }
  goToSelectParish(item) {
    const data = {
      id: item.id,
    }
    this.router.navigate(['main/prayer-time/select-parish'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
