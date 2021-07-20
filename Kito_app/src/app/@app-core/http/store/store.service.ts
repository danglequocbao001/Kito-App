import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IPageRequest, APICONFIG, IPageProduct } from '..';
import { requestQuery } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) { }
  
  public getAllCategories(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.STORE.GET_ALL_CATEGORIES}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }

  public getAllProducts(request: IPageProduct) {
    return this.http.get<any>(`${APICONFIG.STORE.GET_ALL_PRODUCTS}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }

  public getDetailProduct(id) {
    return this.http.get<any>(`${APICONFIG.STORE.GET_DETAIL_PRODUCT(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
