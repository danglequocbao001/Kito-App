import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isLoading = false;
  constructor(
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) { }

  async present(text?) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: text
    })
      .then(a => a.present()
        .then(() => {
          if (!this.isLoading) {
            a.dismiss();
          }
        }));
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
