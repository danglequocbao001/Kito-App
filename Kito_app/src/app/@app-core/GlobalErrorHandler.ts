import { NetworkService } from './utils/network.service';
import { Router } from '@angular/router';
import { LoadingService } from './utils/loading.service';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { ToastService } from './utils';
import { AlertController } from '@ionic/angular';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(Injector) private readonly injector: Injector,
        private loadingService: LoadingService,
        private toarstSerivce: ToastService,
        private router: Router,
        private alertController: AlertController,
        private netWorkService: NetworkService
    ) { }
    handleError(error) {
        console.log(error);

        this.loadingService.dismiss();
        if (error.message) { console.error(error.message); }
        if (error.message === 'Uncaught (in promise): overlay does not exist' || error.message === 'Uncaught (in promise): plugin_not_installed') {
            return
        }
        else if (error.message === 'Signature has expired' || error.message === 'Signature verification raised') {
            this.validateConfirm();
            return
        }
        // else 
        else if (error.message != null) {
            this.toarstSerivce.presentFail(error.message);
        }

        this.netWorkService.setSubscriptions();
    }

    async validateConfirm() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Phiên đã hết hạn, vui lòng đăng nhập lại',
            backdropDismiss: false,
            mode: 'ios',
            buttons: [
                {
                    text: 'Đồng ý',
                    handler: () => {
                        this.router.navigate(['/auth-manager/login']);
                        localStorage.clear();
                        location.reload();
                    }
                }
            ]
        });

        await alert.present();
    }
}
