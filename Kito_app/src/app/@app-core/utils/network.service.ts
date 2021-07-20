import { ToastService } from 'src/app/@app-core/utils';
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { AlertController, Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class NetworkService {
  public connected: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private subscribedToNetworkStatus: boolean = false;
  private network = Network;
  constructor(
    private toastService: ToastService,
    private platform: Platform,
    private alertController: AlertController,) {
  }
  isConnected: any;
  setSubscriptions() {
    if (this.isConnected == 'disconnected') {
      this.networkConfirm();
    }
    if (!this.subscribedToNetworkStatus && this.platform.is('cordova')) {
      this.subscribedToNetworkStatus = true;

      this.network.onChange().subscribe((val) => {
        this.isConnected = val.toString();
        this.showAlert();
      });
      this.network.onDisconnect().subscribe(() => {
        this.connected.next(false);
      });
    }
  }

  showAlert() {
    if (this.isConnected == 'connected') {
      // this.toastService.presentSuccess('Đã kết nối!');
    }
  }

  async networkConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vui lòng kiểm tra lại kết nối mạng!',
      mode: 'ios',
      buttons: [
        {
          text: 'Thử lại',
          handler: () => {
            location.reload();
          }
        }
      ]
    });
    await alert.present();
  }
}