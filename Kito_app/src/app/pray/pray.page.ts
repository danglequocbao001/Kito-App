import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService, EventsService, IPageEvent, AccountService, IPageRequest, AuthService, ParishesService } from '../@app-core/http';
import { DateTimeService, ImageService, LoadingService } from '../@app-core/utils';
import { ToastController } from '@ionic/angular';
import { DioceseService } from '../@app-core/http/diocese';

@Component({
  selector: 'app-pray',
  templateUrl: './pray.page.html',
  styleUrls: ['./pray.page.scss'],
})
export class PrayPage implements OnInit {
  frmPray: FormGroup;
  error_messages = {
    'amount': [
      { type: 'require', message: 'This field must have a value for donate !' }
    ],

  }
  source_type: any;
  source_id: any;
  required_mess = false;
  name: any;
  message_purpose = "";
  required_purpose = false;
  message = "";
  avatar: any;
  img;
  getData:any;
  bishop_name;
  data: any;
  level = 'Linh';
  type_page = 'pray';
  headerCustom = { title: 'Xin lễ', background: '#e5e5e5' };
  x: any;
  amount: any;
  setamount = 0;
  public myDate = new Date().toISOString();
  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public donateService: DonateService,
    public loadingService: LoadingService,
    public toastController: ToastController,
    public parishesService: ParishesService,
    public imageService: ImageService,
    private diocesesService: DioceseService,

  ) {
    this.frmPray = this.formBuilder.group({
      note: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      day: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      amount: new FormControl('', [])
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
  ngOnInit() {
    this.loadingService.present();
    this.name = localStorage.getItem('fullname');
  }
  getUrl() {
    if (!this.img) {
      return `url("https://i.imgur.com/UKNky29.jpg")`
    }
    return `url(${this.img})`
  }
  ionViewWillEnter() {
    let url = window.location.href;
    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        this.data = JSON.parse(params['data']);
        this.source_id = this.data.id;
      });
    }
    else {
      this.source_id = parseInt(localStorage.getItem('parish_id'));
      this.level = 'Linh';
      this.source_type = 'Parish';
      this.parishesService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.parish;
        this.bishop_name = this.getData.priest_name;
        this.img = this.getData.thumb_image.url
      })
    }
    if (this.data && this.data.source_type == 'Diocese') {
      this.source_type = this.data.source_type;
      this.level = 'Giám'
      this.loadingService.dismiss();
      this.diocesesService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.diocese;
        this.bishop_name = this.getData.bishop_name;
        this.img = this.getData.thumb_image.url;
      })
    }
    else if (this.data && this.data.source_type == 'Parish') {
      this.source_type = this.data.source_type;
      this.level = 'Linh'
      this.parishesService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.parish;
        this.bishop_name = this.getData.priest_name;
        this.img = this.getData.thumb_image.url
      })
    }
    this.avatar = localStorage.getItem('avatar');
  }
  callChangeDot() {
    let data = this.frmPray.get('amount').value;
    data = data.replace(/[^0-9]/gm, '');
    data = data.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    this.frmPray.controls['amount'].setValue(data);
  }
  imgNotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
  }
  onSubmit() {
    this.amount = this.frmPray.get('amount').value;
    if (this.frmPray.get('amount').dirty || this.frmPray.get('amount').touched) {
      if (this.amount != undefined) {
        this.amount = this.amount.replace(/\,/g, '')
      }
      else {
        this.amount = "";
      }
      if (this.amount.length != 0 && this.amount < 12000) {
        this.required_mess = true;
        this.message = 'Giá trị phải lớn hơn 12,000 vnd';
        return;
      }
      else {
        this.required_mess = false;
      }
    }
    if (this.amount == "" || this.amount == undefined) {
      this.amount = this.setamount;
    }
   
    this.amount = parseInt(this.amount);  
    var result = {
      pray_log: {
        "amount": this.amount,
        "app_link": "no link",
        "email": localStorage.getItem('email'),
        "note": this.frmPray.get('note').value,
        "source_type": this.source_type,
        "source_id": this.source_id,
        "pray_date": this.frmPray.get('day').value
      },
      type_page: 'pray'
    }
    if (this.amount == 0) {
      
      result.pray_log['payment_type'] = 'visa_master';
      this.donateService.prayByVisa(result.pray_log).subscribe((data) => {
        this.presentToast('Xin lễ thành công!');
      })
    }
    else {
      result.pray_log['token'] = '';
      result.pray_log['payment_type'] = '';
      this.router.navigate(['paymentmethods'], {
        queryParams: {
          data: JSON.stringify(result)
        }
      })
    }
  }
  async goToDioceses() {
    const data = {
      type_page: this.type_page
    }
    this.router.navigate(['/dioceses'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  goToMap(lat, lng) {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng);
  }
}