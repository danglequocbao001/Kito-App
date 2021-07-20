import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountService, PERMISSIONS } from './http';
@Injectable()
export class StorageService {
    private userSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private accountService: AccountService,
    ) { }
    public clear() {
        this.userSub.next(null);
    }
    public get infoAccount(): Observable<any> {
        return this.userSub.asObservable();
    }
    public setInfoAccount() {
        if (localStorage.getItem('Authorization') !== null) {
            return this.accountService.getAccounts().subscribe((data: any) => {
                localStorage.setItem('phoneNumber', data.app_user.phone_number);
                localStorage.setItem('email', data.app_user.email);
                localStorage.setItem('diocese_id', data.app_user.diocese_id);
                localStorage.setItem('fullname', data.app_user.full_name);
                localStorage.setItem('parish_id', data.app_user.parish_id);
                localStorage.setItem('language', JSON.stringify({ name: 'Tiếng Việt', id: 0 }));
                this.userSub.next(data.user);
            })
        }
        else {
            const data = {
                user: {
                    fullname: "Guest",
                    email: "guest@gmail.com",
                    role: PERMISSIONS[0].value,
                    phone_number: "000000"
                }
            }
            return this.userSub.next(data.user);
        }
    }
}
