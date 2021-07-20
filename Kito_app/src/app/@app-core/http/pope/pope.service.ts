import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IPageRequest, APICONFIG } from '..';
import { requestQuery } from '../../utils';
import { IPope } from './pope.DTO';

@Injectable()
export class PopeService {
  constructor(private http: HttpClient) { }

  public getAll(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.POPE.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public getAllByParish(request: IPope) {
     return this.http.get<any>(`${APICONFIG.POPE.GET}?${(requestQuery(request))}`).pipe(
       map((result) => {
         return result;
       }),
       catchError((errorRes: any) => {
         throw errorRes.error;
       })
     )
  }

  public getDetail(id) {
    return this.http.get<any>(`${APICONFIG.POPE.GET_DETAIL(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
