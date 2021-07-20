import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/@app-core/utils';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }

  public getAccounts() {
    return this.http.get(`${APICONFIG.ACCOUNT.PROFILE_USER}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  
  public updateProfile(data) {
    const req = {
      app_user: data
    }
    return this.http.put(`${APICONFIG.ACCOUNT.UPDATE_PROFILE}`, req).pipe(
      map((result:any) => {
      
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public updatePassword(pass) {
    return this.http.put(`${APICONFIG.ACCOUNT.UPDATE_PASS}`, pass).pipe(
      map((result) => {
     
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getAccountDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.ACCOUNT.GETDETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public editAccount(id: string, modifer: any) {
    return this.http.put<any>(`${APICONFIG.ACCOUNT.EDIT(id)}`, modifer).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
  // XOA MOT NHAN VIEN
  public DeleteAccount(id: string) {
    return this.http.delete(`${APICONFIG.ACCOUNT.DELETE(id)}`).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.DELETE, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
  public ContactAdmin(req) {
    return this.http.post(`${APICONFIG.ACCOUNT.CONTACT_ADMIN}`, req).pipe(
      map((result)=> {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }
  public upgradePremium(req) {
    return this.http.post(`${APICONFIG.ACCOUNT.UPDATE_PREMIUM}`, req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }

  public uploadPhoto(req) {
    return this.http.post('http://image-service.patitek.com/api/v1/images/upload', req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }

  public updateAvatar(req) {
    return this.http.put(`${APICONFIG.AUTH.UPDATE_AVATAR}`, req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }),
    )
  }
  public getArrayAvatar(){
    return this.http.get(`${APICONFIG.IMAGE_PROFILE.GET_ALL}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }

  public showSupports() {
    return this.http.get(`${APICONFIG.ACCOUNT.SUPPORT}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }

}
