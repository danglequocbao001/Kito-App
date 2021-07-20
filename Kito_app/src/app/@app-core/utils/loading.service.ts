import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  isLoading = false;

  constructor(
    public loadingController: LoadingController
  ) { }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: '<ion-img src="/assets/icon/icon-loading.svg" alt="loading..." style="width: 10vh; height: 10vh"></ion-img>',
      mode: 'ios',
      cssClass: 'scale-down-center',
      showBackdrop: true,
      keyboardClose: true,
      spinner: null
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      })
    });
  }

  async dismiss() {
    this.isLoading = false;
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        break;
      }
      topLoader = await this.loadingController.getTop();
    }
  }
}
