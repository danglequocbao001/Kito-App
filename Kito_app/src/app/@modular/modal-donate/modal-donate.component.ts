import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-modal-donate',
  templateUrl: './modal-donate.component.html',
  styleUrls: ['./modal-donate.component.scss'],
})
export class ModalDonateComponent implements OnInit {
  constructor(private router: Router, 
    private modalCtrl: ModalController,
    ) { 
    }
    @Input() diocese_id: any;
    @Input() type_page: any;
    data;
    title;
    ngOnInit() {
      if(this.type_page == 'news_parish'){
        this.title = 'loại tin tức'
      }
      else {
        this.title = 'nơi đóng góp'
      }
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  gotoDestination() {
    const data = {
      id: this.diocese_id,
      source_type: 'Diocese',
      type_page: this.type_page
    }
    const dataDiocesenews = {
      id: this.diocese_id,
      type: {
        detail: 'dioceseNews',
        general: 'news'
      }
    }
  
    this.closeModal();
    if(this.type_page == 'donate') {
      this.router.navigate(['donate'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else if(this.type_page == 'pray'){
      this.router.navigate(['pray'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else if(this.type_page == 'news_parish') {
      this.router.navigate(['news'], {
        queryParams: {
          data: JSON.stringify(dataDiocesenews)
        }
      })
    }
  }
  goToParishes() {
    if(this.type_page == 'news_parish') {
      this.data = {
        id: this.diocese_id,
        type_page: 'parish_news',
        type: {
          detail: 'parish_news',
          general: 'news'
        }
      }
    }
    else {
      this.data = {
        id: this.diocese_id,
        source_type: 'Parish',
        type_page: this.type_page
      }
    }
    
    this.router.navigate(['/parishes'], {
      queryParams: {
        data: JSON.stringify(this.data)
      }
    })
    
    this.closeModal();
  }
}
