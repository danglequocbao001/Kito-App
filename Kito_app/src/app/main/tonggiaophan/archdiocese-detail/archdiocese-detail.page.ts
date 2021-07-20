import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BishopService, DioceseNewsService } from 'src/app/@app-core/http';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-archdiocese-detail',
  templateUrl: './archdiocese-detail.page.html',
  styleUrls: ['./archdiocese-detail.page.scss'],
})
export class ArchdioceseDetailPage implements OnInit {
  headerCustom = { title: '' };
  archdiocese = {
    id: '',
    name: '',
    diocese_type: 'archdiocese',
    thumb_image: {
      url: ''
    }
  }
  title = '';
  list = [
    {
      id: '',
      heading: 'Tin tức ',
      items: [],
      type: { general: 'news', detail: 'dioceseNews' }
    },
    {
      id: '',
      heading: 'Tiểu sử các Đức Giám Mục',
      items: [],
      type: { general: 'story', detail: 'bishop' }
    }
  ]
  pageRequest: IPageParishes = {
    page: 1,
    per_page: 4,
    diocese_id: ''
  }

  constructor(
    private route: ActivatedRoute,
    private diocesesService: DioceseService,
    private router: Router,
    private dioceseNewsService: DioceseNewsService,
    private bishopService: BishopService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.getData();
  }

  getArchdiocese(id) {
    this.diocesesService.getDetail(id).subscribe(data => {
      this.archdiocese = data.diocese;
    })
  }

  getDioceseNews() {
    this.dioceseNewsService.getAll(this.pageRequest).subscribe(data => {
      data.diocese_news.forEach(d => {
        d.type = { general: 'news', detail: 'dioceseNews' };
      });
      this.list[0].items = data.diocese_news;
    })
  }

  getBishops() {
    this.bishopService.getAll(this.pageRequest).subscribe(data => {
      this.loadingService.dismiss();
        data.bishop_infos.forEach(d => {
        d.type = { general: 'story', detail: 'bishop' };
      });
      this.list[1].items = data.bishop_infos;
    })
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      const dataParams = JSON.parse(params['data']);
      this.title = dataParams.diocese.type == 'diocese' ? 'giáo phận' : 'tổng giáo phận';
      this.list[0].heading += this.title;
      this.headerCustom.title = dataParams.diocese.name;
      this.pageRequest.diocese_id = dataParams.diocese.id;
      this.list.forEach(item => item.id = dataParams.diocese.id);
      this.getArchdiocese(dataParams.diocese.id);
      this.getDioceseNews();
      this.getBishops();
    }).unsubscribe();
  }

  goToDiocese() {
    const data = {
      id: this.archdiocese.id,
      type: {
        general: 'info',
        detail: 'diocese'
      }
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToParishes() {
    const data = {
      id: this.archdiocese.id,
      type: {
        general: 'parish',
        detail: 'parish'
      }
    }
    this.router.navigate(['/information'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
