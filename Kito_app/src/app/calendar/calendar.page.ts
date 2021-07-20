import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalendarService, EventsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { CalendarDetailPage } from '../@modular/calendar-detail/calendar-detail.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  headerCustom = { title: 'Lịch Công Giáo' };
  DATES = [
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'CN',
  ]
  DATE_ENG = [
    'Sun',
    'Mon',
    'Tue',
    'Web',
    'Thu',
    'Fri',
    'Sat',
  ]
  calendarMonth = []
  masses = []
  date
  currentMonth
  nameMonth
  currentYear
  paramCalendar
  paramMonth
  constructor(
    private calendarService: CalendarService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.date = new Date()
    this.currentMonth = this.date.getMonth()
    this.currentYear = this.date.getFullYear()
    this.nameMonth = this.currentMonth + 1
    this.paramMonth = this.currentMonth + 1
    this.paramMonth = (parseInt(this.paramMonth)) < 10 ? `0${this.paramMonth}` : this.paramMonth
    this.getEventByMonth()
  }
  prevMonth() {
    this.calendarMonth = []
    this.masses = []
    if (this.currentMonth == 0) {
      this.currentMonth = 11
      this.nameMonth = 12
      this.paramMonth = this.nameMonth
      this.currentYear = this.currentYear - 1
    } else {
      this.nameMonth = this.nameMonth - 1

      this.currentMonth = this.currentMonth - 1
      this.paramMonth = this.nameMonth
    }
    this.paramMonth = (parseInt(this.paramMonth)) < 10 ? `0${this.paramMonth}` : this.paramMonth
    this.getEventByMonth()

  }
  nextMonth() {
    this.calendarMonth = []
    this.masses = []
    if (this.currentMonth == 11) {
      this.currentMonth = 0
      this.nameMonth = 1
      this.paramMonth = 1
      this.currentYear = this.currentYear + 1
    } else {
      this.nameMonth = this.nameMonth + 1
      this.currentMonth = this.currentMonth + 1
      this.paramMonth = this.currentMonth + 1
    }
    this.paramMonth = (parseInt(this.paramMonth)) < 10 ? `0${this.paramMonth}` : this.paramMonth

    this.getEventByMonth()
  }
  getEventByMonth() {
    this.loadingService.present()
    this.paramCalendar = {
      cal_date: `${this.currentYear}` + '-' + `${this.paramMonth}` + '-' + '01'
    }
    this.calendarService.getByMonth(this.paramCalendar).subscribe(data => {
      this.loadingService.dismiss()
      this.calendarMonth = data.calendars
      this.masses = data.masses
      this.calendarMonth.forEach(i => {
        i.date = new Date(i.date)
        i.lunar_date = new Date(i.lunar_date)
      })
      this.masses.forEach(i => {
        i.date = new Date(i.date)
        i.lunar_date = new Date(i.lunar_date)
      })
    })
  }
  
  async presentModal(item) {
    this.router.navigate(['/calendar-detail'],{
      queryParams: {
        data: JSON.stringify(item)
      }}
    )
  
  }


}
