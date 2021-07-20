import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BishopService, DioceseNewsService, DioceseService, ParishesService, VaticanService } from 'src/app/@app-core/http';
import { PopeService } from 'src/app/@app-core/http/pope';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  headerCustom = { title: '' };
  data = null;
  map = false;
  constructor(
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private popeService: PopeService,
    private dioceseService: DioceseService,
    private parishService: ParishesService,
    private dioceseNewsService: DioceseNewsService,
    private bishopService: BishopService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.present();
    this.route.queryParams.subscribe(params => {
      const dataParams = JSON.parse(params['data']);
      switch (dataParams.type.general) {
        case 'news':
          this.headerCustom.title = 'Tin tức';
          break;
        case 'info':
          this.headerCustom.title = 'Thông tin';
          break;
        case 'story':
          this.headerCustom.title = 'Tiểu sử';
        case 'parish':
          this.headerCustom.title = 'Thông tin';
          break;
      }
      switch (dataParams.type.detail) {
        case 'vatican':
          this.vaticanService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.vatican_news;
          })
          break;
        case 'pope':
          this.popeService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.pope_info;
          })
          break;
        case 'diocese':
          this.map = true;
          this.dioceseService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.diocese;
          })
          break;
        case 'parish':
          this.map = true;
          this.parishService.getDetail(dataParams.id).subscribe(data => {
            this.map = true;
            this.loading.dismiss();
            this.data = data.parish;
          })
          break;
        case 'parish_news':
          this.parishService.getParishNewsByid(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.parish_news;
          })
          break;
        case 'dioceseNews':
          this.dioceseNewsService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.diocese_news;
          })
          break;
        case 'bishop':
          this.bishopService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.bishop_info;
          })
          break;
      }
    })
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
  }
  goToMap() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.data.location.lat + ',' + this.data.location.long);
  }
}
