import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '..';
import { map, catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IPageRequest } from '../global';
import { requestQuery } from '../../utils';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  public create(req) {
    return this.http.post(`${APICONFIG.ORDER.CREATE}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        if(errorRes.error.messages[0]) {
          this.presentToast(errorRes.error.messages[0]);
        }
        else {
          this.presentToast('Bạn vui lòng kiểm tra lại.')
        }
        throw errorRes.error;
      })
    )
  }

  public getAll(request: IPageRequest) {
    return this.http.get(`${APICONFIG.ORDER.GET_ALL}?${(requestQuery(request))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }

  public getDetail(id) {
    return this.http.get(`${APICONFIG.ORDER.GET_DETAIL(id)}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }
  public paymentOrder_Visa(request) {
    return this.http.post(`${APICONFIG.ORDER.PAYMENT_ORDER_VISA}`,request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }
  public paymentOrder_Momo(request) {
    return this.http.post(`${APICONFIG.ORDER.PAYMENT_ORDER_MOMO}`,request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }
  public paymentOrder_Cash(request) {
    return this.http.post(`${APICONFIG.ORDER.PAYMENT_ORDER_CASH}`,request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }
  public delete(id: number) {
    return this.http.delete(`${APICONFIG.ORDER.DELETE(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
 
 
  async presentToast(mes) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: mes,
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }
}
