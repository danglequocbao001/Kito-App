import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventsService } from 'src/app/@app-core/http';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-detail',
  templateUrl: './prayer-detail.page.html',
  styleUrls: ['./prayer-detail.page.scss'],
})
export class PrayerDetailPage implements OnInit {
  headerCustom = {title: 'Chi tiết bài đọc'};
  dateList = [];
  data: any;
  dateItem: any;
  dateActive: any;
  event = {
    description: '',
    prayers: ''
  }

  constructor(
    private route: ActivatedRoute,
    public dateTimeService: DateTimeService,
    private navCtrl: NavController,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);
      this.dateList = this.data.dateList; 
      this.dateActive = this.data.dateActive;
      this.dateList.forEach(dateItem => dateItem.date = new Date(dateItem.date));
      this.eventsService.getDetail(JSON.parse(params['data']).eventId).subscribe(data => {
        this.event = data.event;
      })
      this.dateItem = this.data.dateItem;
      this.dateItem.date = new Date(this.dateItem.date)
    }).unsubscribe();
  }

  changeDateItem(dateItem) {
    if (dateItem.id == this.dateItem.id) {
      return;
    }
    localStorage.setItem('dateItemId', dateItem.id);
    this.navCtrl.back();
  }
}
