import { Component, OnInit, Output } from '@angular/core';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {
  headerCustom = { title: '(Tổng) Giáo phận' };
  pageRequest: IPageRequest = {
    search: '',
  }
  dioceses = [];
  holySee = {
    diocese_type: "vatican",
    name: "Tòa thánh Vatican",
    thumb_image: { url: "assets/img/tonggiaophan/vatican.jpg" }
  }
  output;
  notFound = false;
  constructor(
    private diocesesService: DioceseService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.present();
    this.getAllDiocese();
  }
  getAllDiocese() {
    this.notFound = false;
    this.diocesesService.getAll(this.pageRequest).subscribe(data => {
      this.notFound = true;
      this.loading.dismiss();
      data.dioceses.forEach(diocese => {
        let hasNull = false;
        for (let i

          in diocese) {

          if (diocese[i] =="location"&& diocese[i] === null) {
            hasNull = true;
            return;
          }
        }
        !hasNull && this.dioceses.push(diocese);
      })
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
    this.getAllDiocese();
  }
  reset() {
    this.dioceses = [];
    this.pageRequest.page = 1;
  }
}
