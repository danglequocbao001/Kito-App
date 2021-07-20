import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IPageRequest, APICONFIG } from '..';
import { requestQuery, ToastService } from '../../utils';
import { DOCTRINE_CLASSES } from '../@http-config';

@Injectable({
  providedIn: 'root'
})
export class DoctrineService {
  constructor(
    private http: HttpClient,
    private toastService:ToastService
    
    ) { }

  public getAll(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.DOCTRINE_CLASSES.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }

  public getDetail(id) {
    return this.http.get<any>(`${APICONFIG.DOCTRINE_CLASSES.GET_DETAIL(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
  public getCateckism(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.CATECKISM.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public register(payload) {
    return this.http.post<any>(`${APICONFIG.DOCTRINE_CLASSES.REGISTER}`, payload).pipe(
      map((result) => {
        this.toastService.presentSuccess(DOCTRINE_CLASSES.REGIEST);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
  public unregister(payload) {
    return this.http.post<any>(`${APICONFIG.DOCTRINE_CLASSES.UNREGISTER}`, payload).pipe(
      map((result) => {
        this.toastService.presentSuccess(DOCTRINE_CLASSES.UNREGIEST);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

}

