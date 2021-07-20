import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    if (localStorage.getItem('Authorization')) {
      return of(true);
    } else {
      this.router.navigateByUrl('/auth-manager/login', { queryParams: { returnUrl: window.location.pathname } });
      return of(false);
    }
  }

}
