import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  headerCustom = { title: 'Kiểm tra đơn hàng' };
  cart = [];
  address = '';
  shipCost = 5000;
  paymentMethod;
  phone;
  order_id: any;
  constructor(
    public dateTimeService: DateTimeService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalCtrl: ModalController,
    private pageNotiService: PageNotiService,
    private router: Router,
    private alertController: AlertController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getCart();
    this.phone = localStorage.getItem('phone_temp');
    this.route.queryParams.subscribe(params => {
      this.paymentMethod = JSON.parse(params['data']).paymentMethod;
    }).unsubscribe();
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.address = localStorage.getItem('address');
  }

  calPrice(item) {
    return item.amount * item.price;
  }

  calTotalPrice() {
    return this.cart.reduce((acc, item) => acc + this.calPrice(item), 0);
  }
  ionViewWillLeave() {
    this.modalCtrl.dismiss();
  }
  confirm() {
    this.loadingService.present();
    const req = {
      order: {
        lat: localStorage.getItem('lat'),
        lng: localStorage.getItem('lng'),
        note: localStorage.getItem('note'),
        full_address: this.address,
        parish_id: localStorage.getItem('tempParishId'),
        phone_number_receiver: localStorage.getItem('phone_temp'),
        order_details_attributes: this.cart.map(item => ({ product_id: item.id, amount: item.amount }))
      }
    }
    if (this.paymentMethod.id == 0) {
      this.orderService.create(req).subscribe((data: any) => {
        this.order_id = data.order.id;
        this.paymentByCash();
        this.loadingService.dismiss();
      })
    }
    else {
      this.orderService.create(req).subscribe(
        (data: any) => {
          this.order_id = data.order.id;
          this.alertSuccess();
          this.modalCtrl.dismiss();
          this.loadingService.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      )
    }
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('cart');
    localStorage.removeItem('phone_temp');
    localStorage.removeItem('note');
  }
  paymentByCash() {
    var orderByCash = {
      order_payment: {
        "order_id": this.order_id
      }
    }
    const datapasing: IDataNoti = {
      title: 'THÀNH CÔNG!',
      des: 'Đơn hàng đặt thành công!',
      routerLink: '/main/chabad'
    }
    this.orderService.paymentOrder_Cash(orderByCash).subscribe((data) => {
      this.pageNotiService.setdataStatusNoti(datapasing);
      this.router.navigateByUrl('/page-noti');
    })
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tiếp tục thanh toán',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'Đóng',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/main'])
          }
        },
        {
          text: 'Tiếp tục',
          handler: () => {
            const data = {
              order_id: this.order_id,
              type_page: 'order',
              token: '',
            }
            this.continute(data);
          }
        }
      ]
    });
    await alert.present();
  }

  continute(data) {
    this.router.navigate(['paymentmethods'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
