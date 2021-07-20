import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DoctrineService, IPageRequest, LOADING } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catechism-marriage',
  templateUrl: './catechism-marriage.page.html',
  styleUrls: ['./catechism-marriage.page.scss'],
})
export class CatechismMarriagePage implements OnInit {
  headerCustom: any;
  list = [];
  id;
  public pageResult: IPageRequest = {
    page: 1,
    per_page: 1000,
    total_objects: 0,
    search: '',
  };
  constructor(
    private route: ActivatedRoute,
    private doctrineService: DoctrineService,
    private loadingService: LoadingService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.headerCustom = { title: data.data };
      this.id = data.id
    })
    this.getDataName();
  }

  getDataName() {
    if (this.id === "1") {
      this.doctrineService.getAll(this.pageResult).subscribe((data: any) => {
        this.list = data.doctrine_classes;
      })
      return
    }
    this.doctrineService.getCateckism(this.pageResult).subscribe((data: any) => {
      this.list = data.doctrine_classes;
    })

  }

  formatTime(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + 'h' + ':' + minutes
    return strTime
  }

  register(id) {
    this.loadingService.present()
    let data = {
      "register_detail": {
        "doctrine_class_id": id
      }
    }
    this.doctrineService.register(data).subscribe((data) => {
      this.ngOnInit();
      this.loadingService.dismiss();
    })

  }
  unregister(id) {
    this.loadingService.present();
    let data = {
      "register_detail": {
        "doctrine_class_id": id
      }
    }
    this.doctrineService.unregister(data).subscribe((data) => {
      this.ngOnInit();
      this.loadingService.dismiss();
    })

  }
  submit(type, id) {
    if (type === true) {
      this.register(id);
    }
    else {
      this.unregister(id);
    }
  }

  async openAlertRegister(id, type, text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: text + ' lớp học',
      mode: 'ios',
      buttons: [
        {
          text: 'Đóng',
        },
        {
          text: text,
          handler: () => {
            this.submit(type, id);
          }
        }
      ]
    });
    await alert.present();
  }
}
