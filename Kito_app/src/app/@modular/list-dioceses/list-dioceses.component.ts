import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/@app-core/http';
import { ModalDonateComponent } from '../modal-donate/modal-donate.component';

@Component({
  selector: 'app-list-dioceses',
  templateUrl: './list-dioceses.component.html',
  styleUrls: ['./list-dioceses.component.scss'],
})
export class ListDiocesesComponent implements OnInit {
  @Input() data: any;
  @Input() flag_parishes_diocese: string;
   @Input() type_page;
  constructor(
    private modalCtrl: ModalController,
    public router: Router,
    private authService: AuthService
  ) {

   }

  ngOnInit() {
  }
  async goToDetail() {
    if(this.type_page === 'parish_news' && this.flag_parishes_diocese === 'parish') {
      localStorage.setItem('tempParishId', this.data.id);

      this.router.navigateByUrl('news');
    }
    else if(this.type_page === 'parish_news') {
      const dataToParish = {
        id: this.data.id,
        type: {
          detail: 'parish_news',
          general: 'news'
        },
        type_page: 'parish_news'
      }
      this.router.navigate(['parishes'], {
        queryParams: {
          data: JSON.stringify(dataToParish)
        }
      })
    }
    else if (this.flag_parishes_diocese === 'diocese') {
      const popover = await this.modalCtrl.create({
        component: ModalDonateComponent,
        swipeToClose: true,
        cssClass: 'modalDonate',
        componentProps: { diocese_id: this.data.id, type_page: this.type_page}
      });
      return await popover.present();
    }
    else if(this.flag_parishes_diocese === 'parish' && this.type_page === 'donate') {
      const data = {
        id: this.data.id,
        source_type: 'Parish',
        type_page: this.type_page,
      }
      this.router.navigate(['donate'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else if(this.flag_parishes_diocese === 'parish' && this.type_page === 'pray') {
        const data = {
          id: this.data.id,
          source_type: 'Parish',
          type_page: this.type_page,
        }
        this.router.navigate(['pray'], {
          queryParams: {
            data: JSON.stringify(data)
          }
        })
    }
  
   
  }
}
