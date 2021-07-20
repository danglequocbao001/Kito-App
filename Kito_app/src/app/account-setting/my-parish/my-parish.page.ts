import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ParishesService, PopeService } from 'src/app/@app-core/http';
import { IPope } from 'src/app/@app-core/http/pope/pope.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-my-parish',
  templateUrl: './my-parish.page.html',
  styleUrls: ['./my-parish.page.scss'],
})
export class MyParishPage implements OnInit {
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;
  tabNew = true;
  headerCustom = { title: 'Thông tin giáo xứ'};
  listPriest = [];
  news: any;
  data;
  img = '';
  id_parish = localStorage.getItem('parish_id');
  popeRequest: IPope = {
    parish_id: this.id_parish,
    page: 1,
    per_page: 6
  }
  total:any;
  constructor(
    private router: Router,
    private parishService: ParishesService,
    private loadingService: LoadingService,
    private popeService: PopeService) { }

  ngOnInit() {
    this.loadingService.present()
    this.getPriest();
    this.myPrish();
  }
  myPrish() {
    this.parishService.getDetail(this.id_parish).subscribe(data => {
      this.loadingService.dismiss()
      this.data = data.parish;
      // this.imgnotFound(data.parish);
      this.img = data.parish.thumb_image.url;
    })
  }

  getUrl() {
    return `url(${this.img})`
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
  }
  changeTabs() {
    if (this.tabNew) {
      this.tabNew = false;
    }
    else {
      this.tabNew = true;
    }
  }
  getPriest(func?) {
    if(this.listPriest.length >= this.total) {
      this.infiniteScroll.disabled = true;
      return;
    }
    this.popeService.getAllByParish(this.popeRequest).subscribe(data => {
      this.total = data.meta.pagination.total_objects;
      !data?.pope_infos?.forEach(element => {
        // this.imgnotFound(element)
      });
      this.listPriest = this.listPriest.concat(data.pope_infos);
      func && func();
      this.popeRequest.page++;
      if (this.listPriest.length >= this.total) {
        this.infiniteScroll.disabled = true;
      }
    })
  }

  loadMoreData(event) {
    this.getPriest(() => {
      event.target.complete();
    });
  }
  goToStoryDetail(item) {
    const data = {
      type: {
        general: 'story',
        detail: 'pope',
      },
      id: item.id
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  counter(i: number) {
    return new Array(i);
  }
}
