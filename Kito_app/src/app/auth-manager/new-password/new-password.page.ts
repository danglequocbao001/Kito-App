import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  passwordValue = '359';
  confirmedPasswordValue = '';
  
  invalidPassword = '';
  invalidConfirmedPassword = '';
  constructor(
    private pageNotiService: PageNotiService,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
    ) { }

  ngOnInit() {}

  clearPassword(event) {
    event.target.value = '';
    this.invalidPassword = '';
    this.invalidConfirmedPassword = '';
  }

  saveValue(event) {
    if (event.target.name == 'password') {
      this.passwordValue = event.target.value;
    } else if (event.target.name == 'confirmedPassword') {
      this.confirmedPasswordValue = event.target.value;
    }
  }

  checkValidPassword(name: string, value: string) {
    if (value == '') {
      this.loadingService.dismiss();
      return `${name} không được trống`;
    }
    if (value.length < 6) {
      this.loadingService.dismiss();
      return `${name} không được ít hơn 6 ký tự`;
    }
    if (name == 'Xác nhận mật khẩu') {
      this.loadingService.dismiss();
      if (this.passwordValue != this.confirmedPasswordValue) {
        return 'Xác nhận mật khẩu không trùng khớp';
      }
    }
    return '';
  }

  confirmPassword() {
    this.loadingService.present();
    const datapasing: IDataNoti = {
      title: 'THÀNH CÔNG!',
      des: 'Lấy lại mật khẩu thành công!',
      routerLink: '/main'
    }
    this.invalidPassword = this.checkValidPassword('Mật khẩu', this.passwordValue);
    this.invalidConfirmedPassword = this.checkValidPassword('Xác nhận mật khẩu', this.confirmedPasswordValue);
    if (this.invalidPassword == '' && this.invalidConfirmedPassword == '') {
      let dataSubmit = {
        "new_password":  this.passwordValue,
        "new_password_confirmation": this.confirmedPasswordValue
      }
      this.authService.newPassword(dataSubmit).subscribe((data) => {
        this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigateByUrl('/page-noti');
        this.loadingService.dismiss();
      })
    }    
  }
}
