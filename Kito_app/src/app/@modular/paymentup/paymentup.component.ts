import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DonateService, OrderService } from '../../@app-core/http';
import { LoadingService, ToastService } from '../../@app-core/utils';
import { IDataNoti, PageNotiService } from '../page-noti/page-noti.service';
declare var Stripe;
@Component({
  selector: 'app-paymentup',
  templateUrl: './paymentup.component.html',
  styleUrls: ['./paymentup.component.scss'],
})
export class PaymentupComponent implements OnInit {
  data: any;
  stripe = Stripe('pk_test_51IFwpWCpBejooWZYsmTcqPL7wfAcx58B6lQNiE3K8XEueAbjRJCRzczedDQO3LbJ1afIh6oln6VT6SZXOZYtiL6G00Ow7S9qTG');
  card: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public loadingService: LoadingService,
    public toastController: ToastController,
    private orderService: OrderService,
    private pageNotiService: PageNotiService,
    private toart: ToastService

  ) { }

  ngOnInit() {
    let url = window.location.href;
    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        this.data = JSON.parse(params['data']);
      }).unsubscribe();
    }
    this.setupStripe();
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    this.card.mount('#card-element');
    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      this.loadingService.present();
      event.preventDefault();
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        }
        else {
        const datapasing: IDataNoti = {
          title: 'THÀNH CÔNG',
          des: 'Thanh toán thành công!',
          routerLink: '/main/chabad'
        }
          if(this.data.type_page == 'pray') {
            this.loadingService.dismiss();
            this.data.pray_log.token = result.source.id;
            this.data.pray_log.payment_type = 'visa_master';
            this.router.navigate(['/payment'], {
              queryParams: {
                data: JSON.stringify(this.data)
              }
            },)
          }
          else if(this.data.type_page == 'donate') {
            this.loadingService.dismiss();
            this.data.donation.token = result.source.id;
            this.data.donation.payment_type = 'visa_master';
            this.router.navigate(['/payment'], {
              queryParams: {
                data: JSON.stringify(this.data)
              }
            },)
          
          }
          else {
              const paramOrder = {
              order_payment : {
              "email": localStorage.getItem('email'),
              "token": result.source.id,
              "order_id": this.data.order_id
          }
        }
         this.orderService.paymentOrder_Visa(paramOrder).subscribe((data)=>{
              this.loadingService.dismiss();
              this.pageNotiService.setdataStatusNoti(datapasing);
              this.router.navigateByUrl('/page-noti');
            },
            (error: any)=> {
              this.loadingService.dismiss();
              this.toart.presentSuccess('Hãy thử lại sau');
            }) 
          }
          this.dismissModal();
        }
      });

    });
  }
  async presentToastValid(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: color,
    });
    toast.present();
  }
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
    });
    toast.present();
  }

}
