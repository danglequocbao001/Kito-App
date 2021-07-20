import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AccountService, PATTERN } from '../@app-core/http';
import { CameraService, ImageService, LoadingService, ToastService } from '../@app-core/utils';
import { ChangepasswordPage } from '../changepassword/changepassword.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  image_avatar: any;
  avatar = '';
  headerCustom = { title: 'Thông tin cá nhân' };
  activatedInput = false;
  loadedData = false;
  form: FormGroup;

  lastForm = {};
  isUpdating = false;

  validationMessages = {
    full_name: [
      { type: 'required', message: 'Name is required.' }
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Phone number is invalid.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email is invalid.' },
    ],
  }

  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accountService: AccountService,
    private passwordModal: ModalController,
    private loadingService: LoadingService,
    private toastService: ToastService,
    public imageService: ImageService,
    private alertCtrl: AlertController,
    private cameraService: CameraService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.initForm();
    this.getData();

  }
  ngDoCheck() {
    this.avatar = localStorage.getItem('avatar')
  }

  ionViewWillEnter() {
    this.avatar = localStorage.getItem('avatar')
  }

  initForm() {
    this.form = this.fb.group({
      avatar: new FormControl(''),
      full_name: new FormControl('', Validators.required),
      birthday: new FormControl(''),
      phone_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM_FULL)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
    });
  }

  async avatarSetting() {
    let alertAvatarSetting = await this.alertCtrl.create({
      message: 'Cài đặt ảnh đại diện',
      mode: 'ios',
      buttons: [
        {
          text: 'Xem ảnh đại diện',
          handler: () => {
            this.cameraService.viewAvatar();
          }
        },
        {
          text: "Thay đổi ảnh đại diện",
          handler: () => {
            this.router.navigateByUrl('/account-setting/change-avatar');
          }
        },

        {
          text: 'Xóa ảnh đại diện',
          handler: () => {
            this.cameraService.removeAvatar();
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

  async openModalPassword() {
    const popover = await this.passwordModal.create({
      component: ChangepasswordPage,
      cssClass: 'modalPassword',
    });
    return await popover.present();
  }

  activateInput() {
    this.activatedInput = true;
    this.lastForm = this.form.value;
  }
  deactivateInput() {
    this.activatedInput = false;
    this.form.patchValue(this.lastForm);
  }

  getData() {
    this.accountService.getAccounts().subscribe(data => {
      data.app_user.birthday;
      this.form.patchValue(data.app_user);
      this.loadedData = true;
      this.loadingService.dismiss();
    });
  }

  updateInfo() {
    this.loadingService.present();
    let data = this.form.value;
    this.accountService.updateProfile(data).subscribe((data) => {
      localStorage.setItem('fullname', data.app_user.full_name);
      this.activatedInput = false;
      this.loadingService.dismiss();
      this.toastService.presentSuccess('Cập nhật thành công !');
    });
  }

  canUpdate() {
    return JSON.stringify(this.lastForm) !== JSON.stringify(this.form.value) && this.form.valid;
  }

}

