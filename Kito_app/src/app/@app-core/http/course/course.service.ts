import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { APICONFIG, IPageRequest } from '..';
import { requestQuery } from '../../utils';
import { IPageCourse } from './course.DTO';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  public getAll(request: IPageCourse) {
    return this.http.get<any>(`${APICONFIG.COURSE.GET_COURSE_ID}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public getGroup() {
    return this.http.get<any>(`${APICONFIG.COURSE.GET_COURSE_GROUP}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public getDetail(id) {
    return this.http.get<any>(`${APICONFIG.DIOCESE.GET_DETAIL(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
