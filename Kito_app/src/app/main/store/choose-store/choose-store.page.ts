import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ParishesService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-choose-store',
  templateUrl: './choose-store.page.html',
  styleUrls: ['./choose-store.page.scss'],
})
export class ChooseStorePage implements OnInit {
  @ViewChild('infiniteScroll') infinityScroll: IonInfiniteScroll;

  headerCustom = { title: 'Chọn cửa hàng khác' };
  list = [];
  pageReq: IPageRequest = {
    page: 1,
    per_page: 20
  }

  constructor(
    private parishesService: ParishesService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(event?) {
    this.parishesService.getAll(this.pageReq).subscribe(data => {
      this.list = this.list.concat(data.parishes);
      this.pageReq.page++;

      if (this.list.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }
      if (event) {
        event.target.complete();
      }
    })
  }

  async alertChooseStore(item) {
    const alert = await this.alertController.create({
      header: `Vào cửa hàng ${item.name}`,
      mode: 'ios',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel'
        },
        {
          text: 'Đồng ý',
          handler: () => {
            localStorage.setItem('tempParishId', item.id);
            this.router.navigateByUrl('main/store');
          }
        }
      ]
    })
    await alert.present();
  }

  loadMoreData(event) {
    this.loadData(event);
  }
}
