import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from 'src/app/@app-core/utils';
import { APICONFIG } from '../@http-config/api';
import { IPageRequest } from '../global';
import { IPageParishes } from './parishes.DTO';

@Injectable({
  providedIn: 'root'
})
export class ParishesService {

  constructor(private http: HttpClient) { }

  public getAllWithDioceseId(request: IPageParishes) {
    return this.http.get<any>(`${APICONFIG.PARISHES.GET_ALL_WITH_DIOCESE_ID}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
  public getAllNewsByParish(request: IPageParishes) {
    return this.http.get<any>(`${APICONFIG.PARISHES.GETNEWS}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
  public getParishNewsByid(id) {
    return this.http.get<any>(`${APICONFIG.PARISHES.GETNEWS}/${(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
  public getAll(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.PARISHES.GET_ALL}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }
  public getDetail(id) {
    return this.http.get<any>(`${APICONFIG.PARISHES.GET_DETAIL(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
