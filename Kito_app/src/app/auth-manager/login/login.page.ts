import { NetworkService } from './../../@app-core/utils/network.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IPageRequest, PATTERN } from 'src/app/@app-core/http';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/@app-core/utils';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { ParishesService } from 'src/app/@app-core/http/parishes';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = 'password';
  public showpass = false;
  public name = 'eye-outline';
  public status = 'login';
  country_codes: any;
  segmentValue = 'login';
  matchPassword = false;
  formLogin: FormGroup;
  formSignUp: FormGroup;
  showSpinner = false;
  validationLoginMessages = {
    phone_number: [
      { type: 'required', message: 'Hãy nhập số điện thoại' },
    ],
    password: [
      { type: 'required', message: 'Hãy nhập mật khẩu' }
    ],
  }

  validationSignUpMessages = {
    full_name: [
      { type: 'required', message: 'Hãy nhập tên' },
      { type: 'pattern', message: 'Tên không thể chứa ký tự đặc biệt' },
    ],
    email: [
      { type: 'required', message: 'Hãy nhập email' },
      { type: 'pattern', message: 'Email không hợp lệ' },
    ],
    phone_number: [
      { type: 'required', message: 'Hãy nhập số điện thoại' },
      { type: 'pattern', message: 'Số điện thoại không hợp lệ' },
    ],
    age: [
      { type: 'required', message: 'Hãy nhập tuổi' }
    ],
    country_code: [
      { type: 'required', message: 'Hãy nhập mã quốc gia' },
    ],
    province: [
      { type: 'required', message: 'Hãy nhập tỉnh' },
    ],
    district: [
      { type: 'required', message: 'Hãy nhập quận' },
    ],
    full_address: [
      { type: 'required', message: 'Hãy nhập địa chỉ' },
    ],
    password: [
      { type: 'required', message: 'Hãy nhập mật khẩu' },
      { type: 'minLength', message: 'Mật khẩu phải dài tối thiểu 6 ký tự' },
    ],
  }

  countries: any;
  listDioceses: any;
  listParishes: any;
  id_diocese = 1;
  tagret;
  code;
  constructor(
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private diocese: DioceseService,
    private parishes: ParishesService,
    private networkService: NetworkService
  ) { }
  pageRequestDioceses: IPageRequest = {
    page: 1,
    per_page: 100,
  }
  pageRequestParishes: IPageParishes = {
    diocese_id: this.id_diocese,
    page: 1,
    per_page: 100,
  }

  ngOnInit() {
    localStorage.setItem('isRepeat', 'true');
    this.networkService.setSubscriptions();
    this.authService.countryCode().subscribe((data: any) => {
      this.country_codes = data.country_codes;
      this.code = data.country_codes[0].phone_code;
    })

    this.diocese.getAll(this.pageRequestDioceses).subscribe(data => {
      this.listDioceses = data.dioceses;
      this.tagret = this.listDioceses[0].name
    }),
      this.parishes.getAllWithDioceseId(this.pageRequestParishes).subscribe(data => {
        this.listParishes = data.parishes;
      })

    this.initForm();
    // this.oneSignal.startOneSignal();
    // this.oneSignal.setUpOneSignal();
  }
  onSelectChange(event) {
    this.pageRequestParishes.diocese_id = this.formSignUp.get('dioceses').value;
    this.parishes.getAllWithDioceseId(this.pageRequestParishes).subscribe(data => {
      this.listParishes = data.parishes;
    })
  }
  initForm() {
    this.formLogin = this.formBuilder.group({
      phone_number: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.formSignUp = this.formBuilder.group({
      full_name: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern(PATTERN.NAME)
      ])),
      sex: new FormControl('male'),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
      phone_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM)
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dioceses: new FormControl('', Validators.compose([
        Validators.required
      ])),
      parish_id: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country_code: new FormControl(''),
      // province: new FormControl('Ho Chi Minh'),
      // district: new FormControl('Thu Duc'),
      full_address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirmed_password: new FormControl('')
    })
  }
  changedSegment(event) {
    this.segmentValue = event.target.value;
  }
  canSubmitLogin() {

    return this.formLogin.valid;
  }

  canSubmitSignUp() {
    return this.formSignUp.valid;
  }
  async submitLogin() {
    this.showSpinner = true;
    if (!this.canSubmitLogin()) {
      this.showSpinner = false;
      this.markFormGroupTouched(this.formLogin);
    } else {
      let dataFormLogin = this.formLogin.value;
      dataFormLogin.phone_number = dataFormLogin.phone_number.length == 10 ? dataFormLogin.phone_number.substring(1, 10) : dataFormLogin.phone_number;
      dataFormLogin.phone_number = `+84${dataFormLogin.phone_number}`;

      let dataSubmit = {
        "phone_number": dataFormLogin.phone_number,
        "password": dataFormLogin.password
      }
      this.authService.login(dataSubmit).subscribe(
        () => {
          this.showSpinner = false;
          this.router.navigate(['main/chabad']);
        },
        (error: any) => {
          this.showSpinner = false;
          throw error
        }
      );
    }
  }

  submitSignUp() {


    this.showSpinner = true;
    if (!this.canSubmitSignUp()) {
      this.toastService.presentSuccess('Kiểm tra lại các trường');

      this.showSpinner = false;
      this.markFormGroupTouched(this.formSignUp);
    } else if (!this.checkMatchConfirmedPassword()) {
      this.showSpinner = false;
      this.toastService.presentSuccess('Mật khẩu không trùng khớp');
    } else {

      let data = this.formSignUp.value;

      if (data.phone_number.search("0") == 0) {
        data.phone_number = data.phone_number.substring(1);
      }
      // if (data.phone_number.search("+84") == 0) {
      //   data.phone_number = '+84' + data.phone_number;

      // }




      let submitData = {
        "full_name": data.full_name,
        "sex": data.sex,
        "birthday": data.age,
        "full_address": data.full_address,
        "phone_number": '+84' + data.phone_number,
        "email": data.email,
        "password": data.password,
        "password_confirmation": data.confirmed_password,
        "parish_id": data.parish_id
      }
      this.authService.signup(submitData).subscribe(
        () => { },
        (error: any) => {
          this.showSpinner = false;
          throw error;
        }
      );
    }
  }

  showPass() {
    this.showpass = !this.showpass;
    if (this.showpass) {
      this.type = 'text';
      this.name = 'eye-off-outline'
    }
    else {
      this.type = 'password';
      this.name = 'eye-outline'
    }
  }
  clickForgotPassword() {
    this.router.navigate(['auth-manager/forgot-password']);
  }
  checkMatchConfirmedPassword() {
    return this.formSignUp.get('password').value == this.formSignUp.get('confirmed_password').value;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
