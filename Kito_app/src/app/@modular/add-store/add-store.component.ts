import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent implements OnInit {
  @Input() item: any;
  amount = 1;
  cart = [];
  constructor(
    public dateTimeService: DateTimeService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCart();
  }
  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  increaseAmount() {
    if (this.amount < 999) {
      this.amount++;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart() {
    let duplicated = false;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == this.item.id) {
        this.cart[i].amount += this.amount;
        this.amount = this.cart[i].amount;
        duplicated = true;
        break;
      }
    }
    if (!duplicated) {
      this.item.amount = this.amount;
      this.cart.push(this.item);
    }

    this.setCart();
    this.modalController.dismiss(this.amount, 'ok');
  }

  calTotalItem() {
    const total = this.cart.reduce((acc, item) => acc + item.amount, 0);
    return total <= 99 ? total : 99;
  }

  goToCart() {
    this.modalController.dismiss();
    this.router.navigateByUrl('main/store/cart');
  }
}
