import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../@app-core/http';
import { ParishesService } from '../@app-core/http/parishes';
import { IPageParishes } from '../@app-core/http/parishes/parishes.DTO';
import { LoadingService } from '../@app-core/utils';

@Component({
  selector: 'app-parishes',
  templateUrl: './parishes.page.html',
  styleUrls: ['./parishes.page.scss'],
})
export class ParishesPage implements OnInit {
  headerCustom = { title: 'Chọn giáo xứ' };

  constructor(
    public parishesService: ParishesService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }
  pageParish: IPageParishes = {
    diocese_id: null,
    page: 1,
    per_page: 1000
  }
  data;
  dataParish = [];
  type_page;
  notFound = false;
  ngOnInit() {
    this.loadingService.present();
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);
      this.pageParish.diocese_id = this.data.id;
      this.type_page = this.data.type_page;
    });
    this.getAll();
  }
  getAll() {
    this.notFound = false;
    this.parishesService.getAllWithDioceseId(this.pageParish).subscribe((data: any) => {
      this.notFound = true;
      this.loadingService.dismiss()
      this.dataParish = data.parishes;
    });
  }
  search(value: string) {
    if (typeof value != 'string') {
      return;
    }
    else if (!value) {
      delete this.pageParish.search;
    }
    else {
      this.pageParish.search = value;
    }
    this.pageParish.page = 1;
    this.dataParish = [];
    this.getAll();
  }
}
