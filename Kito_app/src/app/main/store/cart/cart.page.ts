import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DateTimeService, GeolocationService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  headerCustom = { title: 'Giỏ hàng' };
  cart = [];
  shipCost = 5000;
  paymentMethods = [
    {
      srcIcon: 'assets/icon/dollar.svg',
      name: 'Tiền mặt',
      id: 0
    },
    {
      srcIcon: 'assets/icon/visa.svg',
      name: 'VISA/MASTER',
      id: 1
    },
    {
      srcIcon: 'assets/icon/visa.svg',
      name: 'MOMO',
      id: 2
    }
  ];
  currentPaymentMethodId = 0;
  hasPaymentModal = false;
  paymentSelectElement: any;
  phone_number = null;
  address;
  phone_temp;
  note = null;
  frm: FormGroup;
  constructor(
    public dateTimeService: DateTimeService,
    public formBuilder: FormBuilder,
    private router: Router,
    private geolocationSerivce: GeolocationService,
    private alert: AlertController
  ) {
    this.frm = this.formBuilder.group({
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phone_number: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  ngOnInit() {
    this.getCart();
    this.phone_number = localStorage.getItem('phoneNumber');
    this.address = localStorage.getItem('address');
    if (!localStorage.getItem('address')) {
      this.presentAlert('Cập nhật', 'Lấy địa chỉ của bạn!');
    }

  }
  async presentAlert(header: string, text: string) {
    const alert = await this.alert.create({
      header: header,
      message: text,
      mode: 'ios',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.reTakeLocation();
          }
        }, {
          text: 'Đồng ý',
          handler: () => {
            this.reTakeLocation();
          }
        }
      ]
    });
    await alert.present();
  }
  check(): boolean {
    return !this.cart.length || this.address == null;
  }
  reTakeLocation() {
    this.geolocationSerivce.getCurrentLocation();
    this.address = this.geolocationSerivce.customerLocation.address;
    localStorage.setItem('address', this.address)
  }

  ionViewDidEnter() {
    this.paymentSelectElement = document.querySelector('.payment-method-container');
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  changeAddress() {
    document.getElementById('address').focus();
  }

  changePhoneNumber() {
    document.getElementById('phone_number').focus();
  }

  changeNote() {
    document.getElementById('note').focus();
  }

  decreaseAmount(item) {
    if (item.amount > 1) {
      item.amount--;
      this.setCart();
    }
  }

  increaseAmount(item) {
    if (item.amount < 999) {
      item.amount++;
      this.setCart();
    }
  }

  calPrice(item) {
    return item.amount * item.price;
  }

  calTotalPrice() {
    return this.cart.reduce((acc, item) => acc + this.calPrice(item), 0);
  }

  removeItem(item) {
    this.cart.splice(this.cart.indexOf(item), 1);
    this.setCart();
  }

  goBackToStore() {
    this.router.navigateByUrl('main/store');
  }

  toggleHasPaymentModal(value) {
    this.hasPaymentModal = value;
  }

  onCheckClickOutsidePaymentSelect(e) {
    if (this.paymentSelectElement && !this.paymentSelectElement.contains(e.target)) {
      this.toggleHasPaymentModal(false);
    }
  }

  onClickPaymentModal() {
    event.stopPropagation();
  }

  changePayment(paymentMethod) {
    this.currentPaymentMethodId = paymentMethod.id;
    this.toggleHasPaymentModal(false);
  }

  goToCheckout() {
    if (localStorage.getItem(this.address)) {
      localStorage.removeItem('address');
    }
    if (localStorage.getItem(this.phone_temp)) {
      localStorage.removeItem('phone_temp');
    }
    localStorage.setItem('address', this.address);
    localStorage.setItem('phone_temp', this.phone_number);
    localStorage.setItem('note', this.note);
    const data = {
      paymentMethod: this.paymentMethods[this.currentPaymentMethodId]
    }
    this.router.navigate(['main/store/cart/checkout'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

}
