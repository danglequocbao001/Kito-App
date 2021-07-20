import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSlides } from '@ionic/angular';
import { CalendarService, EventsService, IPageEvent, ParishesService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('fixed', { static: false }) fixedEl: ElementRef;

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };

  pageReq: IPageEvent = {
    calendar_id: null,
    parish_id: null
  }

  parish = null;
  dateList = [];
  activeDateItemId;

  fixedElHeight = 0;

  constructor(
    public dateTimeService: DateTimeService,
    private router: Router,
    private eventsService: EventsService,
    private calendarService: CalendarService,
    private parishService: ParishesService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.present();
    this.initDateList();
    this.getData(localStorage.getItem('parish_id'));
  }

  ionViewWillEnter() {
    const dateItemId = localStorage.getItem('dateItemId');
    if (dateItemId) {
      this.changeSegment(dateItemId);
      localStorage.removeItem('dateItemId');
    }

    const parishId = localStorage.getItem('tempParishId');
    if (parishId) {
      this.getData(parishId);
      localStorage.removeItem('tempParishId');
    }
  }

  ionViewDidEnter() {
    this.fixedEl && (this.fixedElHeight = this.fixedEl.nativeElement.offsetHeight);
  }

  initDateList() {
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDate: any = new Date(now);
      nextDate.setDate(nextDate.getDate() + i);
      this.dateList.push({
        id: i,
        date: nextDate,
        color: '',
        name: '',
        events: []
      })
      this.activeDateItemId = this.dateList[0].id;
    }
  }

  checkDate(date) {
    return parseInt(date);
  }

  getParish() {
    this.parishService.getDetail(this.pageReq.parish_id).subscribe(data => {
      this.loading.dismiss();
      this.parish = data.parish;
    })
  }

  getEvents() {
    this.calendarService.getByWeek(new Date()).subscribe(data => {
      for (let i = 0; i < 7; i++) {
        this.dateList[i].name = data.calendars[i].mass_name;
        this.dateList[i].color = data.calendars[i].shirt_color.color_code;
        this.pageReq.calendar_id = data.calendars[i].id;
        this.eventsService.getAll(this.pageReq).subscribe(data => {
          if (!data.events.length) {
            return;
          }
          data.events.forEach(event => {
            event.start_time = new Date(event.start_time);
            event.name = event.start_time.getHours() >= 12 ? 'Lễ tối' : 'Lễ sáng';
          });
          this.dateList[i].events = data.events;
        })
      }
    })
  }

  getData(parishId) {
    this.pageReq.parish_id = parishId;
    this.getParish();
    this.getEvents();
  }

  changeDateItem(id) {
    this.activeDateItemId = id
  }

  changeSegmentSlide() {
    this.slides.getActiveIndex().then(index => {
      this.changeDateItem(index);
    })
  }

  scrollToTop(value) {
    this.ionContent.scrollToTop(value);
  }

  changeSegment(id) {
    this.slides.slideTo(id).then(() => this.changeDateItem(id));
  }

  goToEventDetail(dateItem, event) {
    const data = {
      dateList: this.dateList,
      dateItem: dateItem,
      eventId: event.id,
      dateActive: this.activeDateItemId
    }
    this.router.navigate(['main/prayer-time/prayer-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  paddingTopIonContent() {
    return this.fixedElHeight + 'px';
  }

  seeMore() {
    this.router.navigateByUrl('main/prayer-time/select-diocese');
  }

  goToMap() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.parish.location.lat + ',' + this.parish.location.long);
  }
}
