import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService, IPageRequest, ParishesService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { ToastController } from '@ionic/angular';
import { DioceseService } from '../@app-core/http/diocese';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  source_id: any;
  source_type: any;
  required_mess = false;
  message_purpose = "";
  required_purpose = false;
  message = "";
  img;
  name_diocese;
  address;
  email = '';
  name;
  avatar = '';
  bishop_name;
  level;
  data;
  frmDonate: FormGroup;

  dataParams;
  pageResult: IPageRequest = {
    page: 1,
    per_page: 100,
  }
  type_page = 'donate';
  type_donate;
  getData;
  x: any;
  amount: any;
  headerCustom = { title: 'Đóng góp', background: '#e5e5e5' };
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public donateService: DonateService,
    public loadingService: LoadingService,
    public toastController: ToastController,
    private diocesesService: DioceseService,
    private parishService: ParishesService
  ) {
    this.frmDonate = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('', Validators.compose([
      ])),
    });
  }
  ngOnInit() {
    this.loadingService.present();
    this.name = localStorage.getItem('fullname');
  }
  imgNotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
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
      this.source_type = 'Parish';
      this.level = 'Linh'
      this.parishService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.parish;
        this.bishop_name = this.getData.priest_name;
        this.img = this.getData.thumb_image.url;
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
        this.img = this.getData.thumb_image.url
      })
    }
    else if (this.data && this.data.source_type == 'Parish') {
      this.source_type = this.data.source_type;
      this.level = 'Linh'
      this.parishService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.parish;
        this.bishop_name = this.getData.priest_name;
        this.img = this.getData.thumb_image.url;
      })
    }
    this.avatar = localStorage.getItem('avatar');
  }
  getUrl() {
    if (!this.img) {
      return `url("https://i.imgur.com/UKNky29.jpg")`
    }
    else return `url(${this.img})`
  }
  callChangeDot() {
    let data = this.frmDonate.get('amount').value;
    data = data.replace(/[^0-9]/gm, '');
    data = data.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    this.frmDonate.controls['amount'].setValue(data);
  }

  onSubmit() {
    this.amount = this.frmDonate.get('amount').value.replace(/\,/g, '');
    if (this.frmDonate.get('amount').dirty || this.frmDonate.get('amount').touched) {
      if (this.amount != undefined) {
        this.amount = this.amount.replace(/\,/g, '')
      }
      else {
        this.amount = "";
      }
      if (this.amount < 12000) {
        this.required_mess = true;
        this.message = 'Giá trị phải lớn hơn 12,000';
        this.loadingService.dismiss();
        return;
      }
      else {
        this.required_mess = false;
        this.loadingService.dismiss();
      }
    }
    this.amount = parseInt(this.amount);
    var donate = {
      donation: {
        "email": localStorage.getItem('email'),
        "token": "",
        "amount": this.amount,
        "note": this.frmDonate.get('note').value,
        "source_type": this.source_type,
        "source_id": this.source_id,
        "payment_type": ''
      },
      type_page: 'donate'
    }
    this.router.navigate(['paymentmethods'], {
      queryParams: {
        data: JSON.stringify(donate)
      }
    })
  }
  goToDioceses() {
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
