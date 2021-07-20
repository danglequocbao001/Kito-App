import { Component, OnInit, Input, NgModule } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-modal-detail-order',
  templateUrl: './modal-detail-order.page.html',
  styleUrls: ['./modal-detail-order.page.scss'],
})
export class ModalDetailOrderPage implements OnInit {
  @Input() id;

  setOrderItemId() {
    localStorage.setItem('orderItemId', this.id);
  }

  order = {
    id: 0,
    status: '',
    note: '',
    full_address: '',
    phone_number_receiver: '',
    created_at: '',
    order_details: []
  }

  loadedData = false;

  isCanceled = '';

  fakeImg = 'https://res.cloudinary.com/baodang359/image/upload/v1616123967/kito-music/MDC319_avatar_bqms50.jpg';

  constructor(
    private orderService: OrderService,
    private dateTimeService: DateTimeService,
    public modalController: ModalController,
    private loadingService: LoadingService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.getData(this.id);
  }

  getDayString() {
    if (this.order.created_at == '') {
      return ' ';
    }
    return this.dateTimeService.DAYS[new Date(this.order.created_at).getDay()].toUpperCase();
  }

  getData(id) {
    this.orderService.getDetail(id).subscribe(data => {
      this.order = data.order;
      this.loadedData = true;
      if (data.order.status == 'pending') {
        this.isCanceled = 'Hủy đơn hàng';
      } else if (data.order.status == 'failed') {
        this.isCanceled = 'Đã hủy đơn hàng';
      }
      else if (data.order.status == 'done') {
        this.isCanceled = 'Đã xác nhận';
      }
      this.loadingService.dismiss();
    })
  }

  async reallyWantCancelOrder(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Xác nhận!',
      message: 'Bạn chắc chắn muốn <strong>hủy</strong> đơn hàng này?',
      mode: 'ios',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Quay lại',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Đồng ý',
          handler: () => {
            this.cancelOrder(id);
          }
        }
      ]
    });

    await alert.present();
  }

  cancelOrder(id) {
    this.loadingService.present();
    this.order.status = 'failed';
    this.orderService.delete(id).subscribe(data => {
      this.modalController.dismiss();
      this.loadingService.dismiss();
      this.isCanceled = 'Đã hủy đơn hàng';

    })
  }

  calTotalPrice() {
    return this.order.order_details.reduce((acc, cur) => acc + cur.amount * cur.total_price, 0)
  }
  calTotalAmount() {
    return this.order.order_details.reduce((acc, cur) => acc + cur.amount, 0);
  }

}
