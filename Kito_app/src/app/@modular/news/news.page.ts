import { IonInfiniteScroll } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DioceseNewsService, IPageRequest, ParishesService, VaticanService } from 'src/app/@app-core/http';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
import { LoadingService } from 'src/app/@app-core/utils';
import { IPageVatican } from 'src/app/@app-core/http/vatican/vatican.DTO';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;

  headerCustom = { title: 'Tin tức' };
  news = [];
  pageRequestVatican: IPageVatican = {
    page: 1,
    category_id: 2,
    per_page: 10
  }
  pageRequestDioceseNews: IPageParishes = {
    page: 1,
    per_page: 10,
    diocese_id: null
  }
  pageRequestParish: IPageParishes = {
    parish_id: localStorage.getItem('parish_id'),
    page: 1,
    per_page: 10,
  }
  dataParams = null;
  check = false;
  newsParish = false;
  vatican = false;
  listCate = []
  idActive;
  displayCate = false;
  toggle = true;
  notFound = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private dioceseNewsService: DioceseNewsService,
    private parishesService: ParishesService,
    private loading: LoadingService,
  ) { }
  ngOnInit() {
    this.loading.present();
    this.vaticanService.getCategory().subscribe((data) => {
      data.vatican_news_categories.forEach(element => {
        if (element.name == "Vatican") {
          this.pageRequestVatican.category_id = element.id;

        }
      });
      this.getParams();

    })

  }
  ionViewWillEnter() {
    const parishId = localStorage.getItem('tempParishId');
    if (parishId) {
      this.pageRequestParish.parish_id = parishId;
      this.news = [];
      this.pageRequestParish.page = 1;
      this.infiniteScroll.disabled = false;
      this.getData();
    }
    localStorage.removeItem('tempParishId');
    this.vaticanService.getCategory().subscribe(data => {
      this.listCate = data.vatican_news_categories;
      this.listCate.forEach(e => {
        if (e.name === 'Vatican') {
          this.idActive = e.id;

        }
      })
    })
  }
  ionViewWillLeave() {
    localStorage.removeItem('voice');
  }
  goToNewsDetail(item) {
    const data = {
      id: item.id,
      type: item.type
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  getData(func?) {
    this.notFound = false;
    if (this.dataParams.id) {
      switch (this.dataParams.type.detail) {
        case 'dioceseNews':
          this.headerCustom.title = 'Tin tức Giáo phận';
          this.dioceseNewsService.getAll(this.pageRequestDioceseNews).subscribe(data => {
            this.notFound = true;
            this.loading.dismiss();
            data.diocese_news.forEach(element => {
              element.type = this.dataParams.type;
              element.time = element.created_at.slice(11, 16);
              element.yymmdd = element.created_at.slice(0, 10);
            });
            this.news = this.news.concat(data.diocese_news);
            func && func();
            this.pageRequestDioceseNews.page++;
            if (this.news.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
        case 'parish_news':
          this.newsParish = true;
          this.headerCustom.title = 'Tin tức Giáo xứ ';
          this.parishesService.getAllNewsByParish(this.pageRequestParish).subscribe(data => {
            this.notFound = true;
            this.loading.dismiss();
            data.parish_news.forEach(element => {
              element.type = this.dataParams.type;
              element.time = element.created_at.slice(11, 16)
              element.yymmdd = element.created_at.slice(0, 10);
            });
            this.news = this.news.concat(data.parish_news);
            func && func();
            this.pageRequestParish.page++;
            if (this.news.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
        case 'vatican':
          this.vatican = true;
          this.headerCustom.title = "Tin tức Vatican"
          this.vaticanService.getAll(this.pageRequestVatican).subscribe(data => {
            this.notFound = true;
            this.loading.dismiss();
            data.vatican_news.forEach(element => {
              element.type = this.dataParams.type
              element.time = element.created_at.slice(11, 16)
              element.yymmdd = element.created_at.slice(0, 10);
            });
            this.news = this.news.concat(data.vatican_news);
            func && func();
            this.pageRequestVatican.page++;
            if (this.news.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
      }
    }
    else {
      switch (this.dataParams.type.detail) {
        case 'vatican':
          this.vatican = true;
          this.vaticanService.getAll(this.pageRequestVatican).subscribe(data => {
            this.notFound = true;
            this.loading.dismiss();
            data.vatican_news.forEach(element => {
              element.type = this.dataParams.type
              element.time = element.created_at.slice(11, 16)
              element.yymmdd = element.created_at.slice(0, 10);
            });
            this.news = this.news.concat(data.vatican_news);
            func && func();
            this.pageRequestVatican.page++;
            if (this.news.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
      }
    }
  }
  changeCate(c) {
    this.idActive = c.id;
    this.pageRequestVatican.category_id = c.id;
    this.reset();
    this.getData();

    this.headerCustom.title = c.name;
    this.displayCate = false;
  }
  showCate() {
    this.displayCate = true;
    if (this.toggle) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  }
  checkShowCate(): boolean {
    return this.toggle == false && this.displayCate == true
  }
  search(value: string) {
    if (typeof value != 'string') {
      return;
    }
    else if (!value) {
      delete this.pageRequestParish.search;
      delete this.pageRequestDioceseNews.search;
      delete this.pageRequestVatican.search;
    }
    else {
      if (this.dataParams.id == null) {
        this.pageRequestVatican.search = value;
      }
      else if (this.dataParams.type.detail == 'dioceseNews') {
        this.pageRequestDioceseNews.search = value;

      }
      else if (this.dataParams.type.detail == 'parish_news') {
        this.pageRequestParish.search = value;
      }
      else if (this.dataParams.type.detail == 'vatican') {
        this.pageRequestVatican.search = value;
      }
    }
    this.reset();
    this.getData();
  }
  reset() {
    this.news = [];
    this.infiniteScroll.disabled = false;
    this.pageRequestDioceseNews.page = 1;
    this.pageRequestParish.page = 1;
    this.pageRequestVatican.page = 1;
  }
  getParams() {
    let url = window.location.href;

    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        this.dataParams = JSON.parse(params['data']);
        this.pageRequestDioceseNews.diocese_id = this.dataParams.id;
        this.getData();
      }).unsubscribe();
    }
    // this.vaticanService.getCategory().subscribe((data) => {
    //   data.vatican_news_categories.forEach(element => {
    //     if (element.name == "Vatican") {
    //       this.pageRequestVatican.category_id = element.id;
    //     }
    //   });
    //   this.getData();
    // })
  }
  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    });
  }
  imgNotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
  }
  goToOtherParishes() {
    const data = this.dataParams;
    data['type_page'] = 'parish_news'
    this.router.navigate(['/dioceses'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
