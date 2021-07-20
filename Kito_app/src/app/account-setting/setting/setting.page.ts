import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DioceseService, ParishesService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})

export class SettingPage implements OnInit {
  headerCustom = { title: 'Cài đặt' };
  items = [];
  countApi = 0;

  constructor(
    private router: Router,
    private dioceseService: DioceseService,
    private parishService: ParishesService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.initData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    const languageName = JSON.parse(localStorage.getItem('language'))?.name;
    if (languageName) {
      this.items[0].name = languageName;
    } else {
      localStorage.setItem('language', JSON.stringify({ name: "Tiếng Việt", id: 0 }));
      this.items[0].name = 'Tiếng Việt';
    }
    this.dioceseService.getDetail(localStorage.getItem('diocese_id')).subscribe(
      data => {
        this.items[1].name = data.diocese.name;
        this.countApi++;
        if (this.countApi >= 2) {
          this.loadingService.dismiss();
        }
      },
      () => {
        this.loadingService.dismiss();
      })
    this.parishService.getDetail(localStorage.getItem('parish_id')).subscribe(
      data => {
        this.items[2].name = data.parish.name;
        this.countApi++;
        if (this.countApi >= 2) {
          this.loadingService.dismiss();
        }
      },
      () => {
        this.loadingService.dismiss();
      })
  }

  initData() {
    this.items = [
      {
        type: 'language',
        title: "Ngôn ngữ",
        icon: "assets/img/setting/language.svg",
        // name: JSON.parse(localStorage.getItem('language')).name,
        routerLink: '/account-setting/setting/setting-languages'
      },
      {
        id: localStorage.getItem('diocese_id'),
        type: 'diocese',
        title: "Giáo phận",
        icon: "assets/img/setting/archdiocese.svg",
        name: null,
        routerLink: '/account-setting/setting'
      },
      {
        id: localStorage.getItem('parish_id'),
        type: 'parish',
        title: "Giáo xứ",
        icon: "assets/img/setting/parish.svg",
        name: null,
        routerLink: '/account-setting/setting'
      },
    ];
  }

  goToDetail(item) {
    if (item.type == 'language') {
      this.router.navigateByUrl(item.routerLink);
    } else {
      let data = {
        type: item.type,
        dioceseId: item.type == 'parish' ? this.items[1].id : null
      }
      this.router.navigate(['account-setting/setting/select-diocese'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
  }
}
