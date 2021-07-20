import { LoadingService } from './../@app-core/utils/loading.service';
import { DioceseService } from './../@app-core/http/diocese/diocese.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent, IonButtons } from '@ionic/angular';
import { DateTimeService } from '../@app-core/utils';
import { ClassMethod } from '@angular/compiler';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
  @ViewChild('segment', { static: false }) segment: any;

  headerCustom = { title: 'Thống kê' };
  years = [];
  data: any = [];
  selectedMonthId;
  selectedYear: any;
  hasYearOptions = false;

  slideOptions = {
    initialSlide: 0
  };

  constructor(
    public DateTimeService: DateTimeService,
    private dioceseService: DioceseService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.loadingService.present();
    for (let year = 2020; year <= new Date().getFullYear(); year++) {
      this.years.push({
        number: year,
        months: []
      })
    }
    this.selectedYear = this.years[this.years.length - 1].number;
    this.years.forEach(year => {
      let months = [];
      for (let i = 1; i <= 12; i++) {
        const daysInMonth = 1;
        let dates = [];
        this.dioceseService.getAttention(year.number + '-' + i + '-' + daysInMonth).subscribe((data) => {
          this.data = data.calendars;
          for (let data of this.data) {
            let number;
            if (data.date.slice(8, 9) == '0') {
              number = data.date.replace(data.date.slice(8, 9), '').slice(8, 9);
            } else number = data.date.slice(8, 10)
            dates.push({
              id: data.id,
              number: number,
              hasJoin: data.joined,
              special: 0,
              mass_type: data.mass_type,
            })
          }
        })
        months.push({
          id: i - 1,
          name: `Tháng ${i}`,
          dates: dates
        })
      }
      year.months = months;
      setTimeout(() => {
        this.loadingService.dismiss();
      }, 1500)
    })
    this.selectedMonthId = 0;
  }

  calJoinedEvents(dates) {
    return dates.reduce((acc, cur) => cur.hasJoin ? ++acc : acc, 0);
  }

  calJoinedSpecialEvents(dates) {
    return dates.reduce((acc, cur) => cur.special && cur.hasJoin ? ++acc : acc, 0);
  }

  calSpecialEvents(dates) {
    return dates.reduce((acc, cur) => cur.special ? ++acc : acc, 0);
  }

  scrollToTop(value) {
    this.ionContent.scrollToTop(value);
  }

  changeSegment(id, event) {
    const offsetLeft = event.target.offsetLeft;
    const offsetWidth = event.target.offsetWidth;
    const segmentOffsetWidth = this.segment.el.offsetWidth;
    this.segment.el.scroll(offsetLeft - segmentOffsetWidth / 2 + offsetWidth / 2, 0);
    this.slides.lockSwipes(false).then(() => {
      this.slides.slideTo(id).then(() => {
        this.changeSlide(id);
        this.slides.lockSwipes(true);
      });
    })
  }

  changeSlide(id) {
    this.selectedMonthId = id;
  }

  toggleHasYearOptions(bool) {
    this.hasYearOptions = bool;
  }

  disableSwipe() {
    this.slides.lockSwipes(true);
  }

  changeYear(year) {
    event.stopPropagation();
    if (this.selectedYear != year.number) {
      this.selectedYear = year.number;
      this.selectedMonthId = 0;
    }
    this.toggleHasYearOptions(false);
  }

  onScrollContent(event) {
    this.toggleHasYearOptions(false);
  }
}