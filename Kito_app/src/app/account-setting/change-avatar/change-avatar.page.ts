import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/@app-core/http';
import { CameraService, LoadingService, ToastService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {
  headerCustom = { title: 'Đổi ảnh đại diện' };
  activedAvatar;
  listAvatar = [];
  constructor(
    private accoutnService: AccountService,
    private alertCtrl: AlertController,
    private cameraService: CameraService,
    private toastService: ToastService,
    public loadingService: LoadingService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getData();
  }
  activeAvatar(item) {
    this.activedAvatar = item;

  }
  checkActivedItem(item) {
    return this.activedAvatar && item === this.activedAvatar;
  }
  getData() {
    this.accoutnService.getArrayAvatar().subscribe((data) => {
      this.listAvatar = data.data;
    });
  }
  async avatarSetting() {
    let alertAvatarSetting = await this.alertCtrl.create({
      message: 'Cài đặt ảnh đại diện',
      mode: 'ios',
      buttons: [
        {
          text: 'Chọn từ thư viện',
          handler: () => {
            this.cameraService.getAvatarUpload(this.activedAvatar);
            this.router.navigateByUrl('account');
          }
        },
        {
          text: 'Chụp ảnh mới',
          handler: () => {
            this.cameraService.getAvatarTake(this.activedAvatar);
            this.router.navigateByUrl('account');
          }
        },

        {
          text: 'Đóng',
          role: 'destructive',
        },
      ]
    });
    await alertAvatarSetting.present();

  }
  updateAvatar() {
    this.loadingService.present()
    localStorage.setItem('avatar', this.activedAvatar)
    this.accoutnService.updateAvatar({ "thumb_image": { "url": this.activedAvatar } }).subscribe(data => {
    })
    this.loadingService.dismiss();
    this.accoutnService.getAccounts().subscribe();
    this.toastService.presentSuccess('Cập nhật ảnh thành công !');
    this.accoutnService.updateAvatar(this.activedAvatar);
    this.router.navigateByUrl('account');
  }
}
