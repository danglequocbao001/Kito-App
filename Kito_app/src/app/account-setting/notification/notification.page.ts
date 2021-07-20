import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IPageRequest, OrderService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { ModalDetailOrderPage } from 'src/app/@modular/modal-detail-order/modal-detail-order.page';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;

  headerCustom = { title: 'Thông báo' };
  orders = [];
  lastedData: any;
  requestOrder: IPageRequest = {
    page: 1,
    per_page: 100,
  }
  constructor(private orderService: OrderService,
    private modalController: ModalController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getDataNotifications();
  }
  getDataNotifications(func?) {
    this.orderService.getAll(this.requestOrder).subscribe(data => {
      // this.orders = this.orders.concat(data.orders);
      for(let i = 11; i >= 1; i--) {
        this.orders.push({
          id: i,
          status: 'chua xem',
          created_at: 29-i + '-04-2021'
        })
      }
      this.orders.length;
      func && func();
      this.requestOrder.page++;
      // if (this.orders.length >= data.meta.pagination.total_objects) {
      //   this.infiniteScroll.disabled = true;
      this.orders.sort((a, b) => {
        var a_time = new Date(a.created_at);
        var b_time = new Date(b.created_at);
        return b_time.getTime() - a_time.getTime()
        //})
      })
    })
  }
  loadMoreData(event) {
    this.getDataNotifications(() => {
      event.target.complete();
    })
  }
  async openOrderDetailModal(notify) {
    this.loadingService.present();
    const modal = await this.modalController.create({
      component: ModalDetailOrderPage,
      cssClass: 'event-detail-modal',
      swipeToClose: true,
      componentProps: {
        id: notify.id
      }
    });
    modal.present();
    modal.onWillDismiss().then(() => {
      this.reset();
    })
  }
  reset() {
    this.orders = [];
    this.requestOrder.page = 1;
    this.getDataNotifications();
  }

}
