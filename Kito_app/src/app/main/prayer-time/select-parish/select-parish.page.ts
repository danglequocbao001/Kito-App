import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParishesService } from 'src/app/@app-core/http';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-select-parish',
  templateUrl: './select-parish.page.html',
  styleUrls: ['./select-parish.page.scss'],
})
export class SelectParishPage implements OnInit {
  headerCustom = { title: 'Chọn giáo xứ' };
  list = [];
  notFound = false;
  id;
  pageRequest: IPageParishes = {
    page: 1,
    per_page: 100,
    diocese_id: null
  }
  constructor(
    private router: Router,
    private parishService: ParishesService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.route.queryParams.subscribe(params => {
      this.pageRequest.diocese_id = JSON.parse(params['data']).id;
    })
    this.getData();
  }
  getData() {
    this.notFound = false;
    this.parishService.getAllWithDioceseId(this.pageRequest).subscribe((data) => {
      this.loadingService.dismiss();
      this.notFound = true;
      this.list = data.parishes;
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
  select(item) {
    localStorage.setItem('tempParishId', item.id);
    this.router.navigateByUrl('main/prayer-time');
  }
}
