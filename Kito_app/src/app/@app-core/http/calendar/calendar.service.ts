import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { APICONFIG } from '..';
import { requestQuery } from '../../utils';
import { IPageCalendar } from './calendar.DTO';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(
    private http: HttpClient
  ) { }

  public getByMonth(request: IPageCalendar) {
    return this.http.get<any>(`${APICONFIG.CALENDARS.GET_BY_MONTH}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getByWeek(cal_date) {
    return this.http.get<any>(`${APICONFIG.CALENDARS.GET_BY_WEEK}?cal_date=${cal_date}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getByday(request: IPageCalendar) {
    return this.http.get<IPageCalendar>(`${APICONFIG.CALENDARS.GET_BY_DAY}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
}
