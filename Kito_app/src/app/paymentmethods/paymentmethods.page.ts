import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DonateService, OrderService } from '../@app-core/http';
import { LoadingService, ToastService } from '../@app-core/utils';
import { PaymentupComponent } from '../@modular/paymentup/paymentup.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.page.html',
  styleUrls: ['./paymentmethods.page.scss'],
})
export class PaymentmethodsPage implements OnInit {

  dataParam: any;
  payment;
  headerCustom = { title: 'Phương thức thanh toán', background: '#fff' }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private alert: AlertController,
    private orderService: OrderService,
    private loading: LoadingService,
    private iab: InAppBrowser,
    private donateService: DonateService,
    private toart: ToastService,

  ) { }

  ngOnInit() {
    let url = window.location.href;
    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        this.dataParam = JSON.parse(params['data']);
      })
    }
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: PaymentupComponent,
      swipeToClose: true,
      cssClass: 'modal__payment'
    });
    await modal.present();

  }
  async presentAlertMoMo(header: string, text: string) {
    const alert = await this.alert.create({
      mode: 'ios',
      header: header,
      message: text,
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Tiếp tục',
          handler: () => {
            const browser = this.iab.create(this.payment.pay_url, '_system', 'location=yes');
          }
        }
      ]
    });
    await alert.present();
  }
  goMomo() {
    if (this.dataParam.type_page == 'order') {
      const orderParam = {
        order_payment: {
          "app_link": "no link",
          "order_id": this.dataParam.order_id,
        }
      }
      this.loading.present();
      this.orderService.paymentOrder_Momo(orderParam).subscribe((data) => {
        this.openMomoPopUp();
      },
        () => {
          this.loading.dismiss();
          this.toart.presentSuccess('Hãy thử lại sau')
        })
    }
    else if(this.dataParam.type_page == 'pray') {
    this.dataParam.pray_log["app_link"] ="no link";
      this.loading.present();
      this.dataParam.pray_log.payment_type = 'momo';
      this.donateService.prayByMoMo(this.dataParam).subscribe((data) => {
        this.payment = data;
        this.openMomoPopUp();
      },
        () => {
          this.loading.dismiss();
          this.toart.presentSuccess('Hãy thử lại sau');
        })
    }
    else if(this.dataParam.type_page == 'donate'){
      this.dataParam.donation["app_link"] ="no link";
      this.loading.present();
      this.dataParam.donation.payment_type = 'momo';
      this.donateService.donateByMoMo(this.dataParam).subscribe((data) => {
        this.payment = data;
        this.openMomoPopUp();
      },
        () => {
          this.loading.dismiss();
          this.toart.presentSuccess('Hãy thử lại sau');
        })
    }
  }
  openMomoPopUp() {
    this.loading.dismiss();
    this.presentAlertMoMo('Thông báo', 'Bắt đầu thanh toán qua momo');
  }
}
