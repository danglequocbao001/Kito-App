import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { APICONFIG } from '../@http-config';
import { IPageEvent } from './event.DTO';

@Injectable()
export class EventsService {
  constructor(
    private http: HttpClient
  ) { }

  public getAll(request: IPageEvent) {
    return this.http.get<any>(`${APICONFIG.EVENTS.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.EVENTS.GET_DETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
}
