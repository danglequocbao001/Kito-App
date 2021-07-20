import { DioceseService } from './../@app-core/http/diocese/diocese.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, DonateService, ParishesService, VaticanService } from '../@app-core/http';
import { AlertController, IonInfiniteScroll, ModalController, NavController, Platform } from '@ionic/angular';
import { AccountService } from '../@app-core/http/account/account.service';
import { GeolocationService, LoadingService, OneSignalService, ToastService } from '../@app-core/utils';
import { IPageVatican } from '../@app-core/http/vatican/vatican.DTO';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  name = '';
  avatar = '';
  menu = [
    {
      name: '(Tổng) Giáo phận',
      thumbImage: 'assets/img/menu/tonggiaophan.svg',
      desUrl: 'main/tonggiaophan',
      fullWidth: true
    },
    {
      name: 'Tin tức giáo xứ',
      thumbImage: 'assets/img/menu/tintuc.svg',
      desUrl: 'news',
      fullWidth: true
    },
    {
      name: 'Chi tiết giờ lễ',
      thumbImage: 'assets/img/menu/chitietgiole.svg',
      desUrl: 'main/prayer-time',
    },
    {
      name: 'Lớp học Giáo lý',
      thumbImage: 'assets/img/menu/lophocgiaoly.svg',
      desUrl: 'main/catechism-class',
    },
    // {
    //   name: 'Đóng góp',
    //   thumbImage: 'assets/img/menu/donggop.svg',
    //   desUrl: 'donate',
    // },
    // {
    //   name: 'Xin lễ',
    //   thumbImage: 'assets/img/menu/xinle.svg',
    //   desUrl: 'pray',
    // },
    {
      name: 'Lịch Công giáo',
      thumbImage: 'assets/img/menu/lichconggiao.svg',
      desUrl: 'main/calendar',
    },
    {
      name: 'Cửa hàng',
      thumbImage: 'assets/img/menu/cuahang.svg',
      desUrl: 'main/store',
    },
    {
      name: 'Nhạc Thánh Ca',
      thumbImage: 'assets/img/menu/thanhca.svg',
      desUrl: 'main/hymn-music',
    },
    {
      name: 'Video bài giảng',
      thumbImage: 'assets/img/menu/baigiang.svg',
      desUrl: 'main/hymn-video',
    },
  ]

  vaticanList = {
    items: [],
    type: { general: 'news', detail: 'vatican' }
  }
  subscribe: any;
  public alertPresented = false;
  count = 0;
  interval: any;
  pageRequestDioceses: IPageRequest = {};
  onseSignalAppId = '17a2acbf-854f-4011-97b8-43f2640b7312'
  googleProjectId = 'kitoapp-312008'
  device_id = '5af57365-d47c-4f17-bae0-06447b6d8f72ic'
  token_id = ''
  pageRequestParishes: IPageParishes = {
    diocese_id: 0,
  }
  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
    private accountService: AccountService,
    private authService: AuthService,
    public modalCtrl: ModalController,
    public vaticanService: VaticanService,
    private loading: LoadingService,
    private platform: Platform,
    private alertController: AlertController,
    private toarst: ToastService,
    private navController: NavController, 
    private geolocationSerivce: GeolocationService,
    private diocesesService: DioceseService,
    private parishesService: ParishesService,
    public oneSignal: OneSignal,
    public donateService: DonateService
  ) {
    this.getTokenID();

  }

  ionViewWillEnter() {
    // this.autoJoinEvent();
   // this.checkAvatar();
  }
  ngOnInit() {
    this.geolocationSerivce.getCurrentLocationNoLoading();
    this.OneSignalService.startOneSignal();
    this.getVatican();
    this.blockBackBtn();
  }

  checkAvatar() {
    this.name = localStorage.getItem('fullname');
    this.accountService.getAccounts().subscribe(data => {
      this.name = data.app_user.full_name;
      if (data.app_user.thumb_image == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
        localStorage.setItem('avatar', this.avatar);
      }
      else if (data.app_user.thumb_image.url == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
        localStorage.setItem('avatar', this.avatar);
      }
      else {
        this.avatar = data.app_user.thumb_image.url;
        localStorage.setItem('avatar', this.avatar);
      }
    })
  }

  blockBackBtn() {
    this.subscribe = this.platform.backButton.subscribeWithPriority(99999, () => {
      if (this.router.url === '/main') {
        this.count++;
        if (this.count == 1) {
          this.toarst.presentSuccess('Nhấn lần nữa để thoát!');
        }
        else {
          this.presentAlert();
        }
        setTimeout(() => {
          this.count = 0;
        }, 2000);
      }
      else {
        this.navController.back();
      }
    })
  }

  autoJoinEvent() {
    let dateObj = new Date();
    let currentDay = dateObj.toISOString().substr(0, 10);
    this.diocesesService.getAttention(currentDay).subscribe((dataCalendar) => {
      for (let calendar of dataCalendar.calendars) {
        if (calendar.date.slice(0, 10) == currentDay && calendar.joined == false) {
          this.parishesService.getAll(this.pageRequestParishes).subscribe((dataParishes) => {
            let timeOut, timeClear = 0;
            if (parseInt(localStorage.getItem('timeOut')) > 0) {
              timeOut = parseInt(localStorage.getItem('timeOut')) + 1;
            } else timeOut = 0;
            if (localStorage.getItem('isRepeat') == 'true') {
              this.repeatAlert();
            }
            clearInterval(this.interval);
            this.interval = setInterval(() => {
              this.geolocationSerivce.getCurrentLocationNoLoading();
              if (timeOut >= 1200) {
                let currentTime = dateObj.getHours() + ":" + dateObj.getMinutes();
                let attention_log = {
                  cal_time: currentDay + ' ' + currentTime,
                  long: parseFloat(localStorage.getItem('lng')),
                  lat: parseFloat(localStorage.getItem('lat'))
                }
                this.diocesesService.creatAttention({ attention_log }).subscribe((data) => {
                  clearInterval(this.interval);
                  if (data.message == 'Thành công!') {
                    this.presentAlertJoinEvent(data.message);
                  }
                  else localStorage.removeItem('timeOut');
                })
              }
              for (let parish of dataParishes.parishes) {
                parish.location == null ? parish.location = [] : parish.location
                let tempDistance = this.geolocationSerivce.distanceFromUserToPointMet(
                  localStorage.getItem('lat'),
                  localStorage.getItem('lng'),
                  parish.location.lat,
                  parish.location.long,
                )
                if (tempDistance - 30 <= 0) {
                  timeOut++;
                  break;
                }
              }
              localStorage.setItem('timeOut', timeOut.toString());
              if (timeClear == 99) {
                console.clear();
              }
              timeClear++;
            }, 1500)
          })
          break;
        }
      }
    })
  }

  async repeatAlert() {
    const alert = await this.alertController.create({
      header: 'Giữ ứng dụng luôn được bật trong vòng 30 phút để tự động điểm danh khi gần nhà thờ',
      mode: 'ios',
      buttons: [
        {
          text: 'Đồng ý',
          handler: () => {
          }
        },
        {
          text: 'Không nhắc lại',
          handler: () => {
            localStorage.setItem('isRepeat', 'false')
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertJoinEvent(data) {
    const alert = await this.alertController.create({
      header: 'Điểm danh tự động: ' + data,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Đồng ý',
          handler: () => {
            localStorage.removeItem('timeOut');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert() {
    this.alertPresented = true;
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      header: 'Bạn có muốn thoát ứng dụng ?',
      mode: 'ios',
      buttons: [
        {
          text: 'Hủy',
          handler: () => {
            this.alertPresented = false;
            return;
          }
        },
        {
          text: 'Đồng ý',
          handler: () => {
            localStorage.removeItem('isRepeat');
            navigator['app'].exitApp();
          }
        },
      ]
    });
    await alert.present();
  }

  getVatican() {
    const pageRequest: IPageVatican = {
      page: 1,
      per_page: 4,
      category_id: 9
    }
    this.vaticanService.getAll(pageRequest).subscribe(data => {
      this.loading.dismiss();
      data.vatican_news.forEach(v => v.type = this.vaticanList.type);
      this.vaticanList.items = data.vatican_news;
    })
  }

  goToDetail(item) {
    if (item.desUrl == 'donate') {
      const data = {
        type: 'donate'
      }
      this.authService.sendData(data)
      this.router.navigateByUrl(item.desUrl);

    }
    else if (item.desUrl == 'pray') {
      const data = {
        type: 'pray'
      }
      this.authService.sendData(data)
      this.router.navigateByUrl(item.desUrl);

    }
    else if (item.desUrl == 'news') {
      const data = {
        id: localStorage.getItem('parish_id'),
        type: {
          detail: 'parish_news',
          general: 'news'
        }

      }
      this.router.navigate(['/news'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else this.router.navigateByUrl(item.desUrl);
  }
  getTokenID() {
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        this.oneSignal.startInit(this.onseSignalAppId, this.googleProjectId)
      }
      else if (this.platform.is('ios')) {
        this.oneSignal.startInit(this.onseSignalAppId)
      }
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is receive
      })
      this.oneSignal.handleNotificationOpened().subscribe(result => {
        // do something when a notification is opened 

      })
      this.oneSignal.endInit()
      this.oneSignal.getIds().then(identity => {
        this.token_id = identity.pushToken
        this.device_id = identity.userId
        this.saveDeviceID();

      })
    }
  }

  saveDeviceID() {
    const param = {
      "register_device": {
        "token": this.token_id
      }
    }
    this.donateService.registerDevice(param).subscribe(() => {
    })
  }

  goToAccountSetting() {
    this.router.navigateByUrl('account-setting');
  }
}