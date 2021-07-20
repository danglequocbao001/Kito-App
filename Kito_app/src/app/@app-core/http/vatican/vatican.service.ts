import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { APICONFIG } from '..';
import { requestQuery } from '../../utils';
import { IPageVatican } from './vatican.DTO';

@Injectable()
export class VaticanService {
  constructor(private http: HttpClient) { }

  public getAll(request: IPageVatican) {
    return this.http.get<any>(`${APICONFIG.VATICAN.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public getCategory() {
    return this.http.get<any>(`${APICONFIG.VATICAN.GET_CATE}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }


  public getDetail(id) {
    return this.http.get<any>(`${APICONFIG.VATICAN.GET_DETAIL(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
