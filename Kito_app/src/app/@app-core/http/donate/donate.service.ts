import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { APICONFIG } from '../@http-config';
import { IPageRequest } from '../global';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor( private http: HttpClient) { }
  public donateByVisa(req) {
    return this.http.post(`${APICONFIG.DONATES.DONATE_VISA}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
  public donateByMoMo(req) {
    return this.http.post(`${APICONFIG.DONATES.DONATE_MOMO}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
  public prayByVisa(req) {
    return this.http.post(`${APICONFIG.PRAY.PRAY_VISA}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
  public prayByMoMo(req) {
    return this.http.post(`${APICONFIG.PRAY.PRAY_MOMO}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
  public registerDevice(req) {
    return this.http.post(`${APICONFIG.DEVICES.REGISTER}`, req).pipe(
        map((result) =>{
            return result
        }),
        catchError((error)=>{
            throw error
        })
    )
}
}
