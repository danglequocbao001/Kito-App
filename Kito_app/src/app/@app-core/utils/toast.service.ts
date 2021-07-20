import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TOARST } from '../http/@http-config/messages'
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async presentSuccess(message?, position?, duration?, color?) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: message || 'Thành công!',
      duration: duration || 1000,
      position: position || 'top',
      cssClass: 'toast-css',
      color: color || TOARST.COLOR.dark,
    });
    toast.present();
  }
  async presentFail(message?, position?, duration?, color?) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: message,
      duration: duration || 1000,
      position: position ||'top',
      cssClass: 'toast-css',
      color: color || TOARST.COLOR.dark,
    });
    toast.present();
  }
}
