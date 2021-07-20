import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { LoadingService, CameraService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-popoverimage',
  templateUrl: './popoverimage.component.html',
  styleUrls: ['./popoverimage.component.scss'],
})
export class PopoverimageComponent implements OnInit {

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private platform: Platform,
    private navController: NavController,
    private CameraService: CameraService
  ) { }
  avatar = '';
  subscribe: any;
  count = 0;
  ngOnInit() {
    this.avatar = localStorage.getItem('avatar');
    this.subscribe = this.platform.backButton.subscribeWithPriority(99999, () => {
      if (this.router.url === '/account') {
        this.count++;
        if (this.count == 1) {
          this.CameraService.popoverImage.dismiss();
          this.count = 0;
        }
      }
      else {
        this.navController.back();
      }
    })
  }
  getUrl() {
    return `url(${this.avatar})`
  }
}
