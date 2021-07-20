import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_URL, AuthService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  wrongCode = false;
  inputCode: FormGroup;

  error_messages = {
    'code1': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code2': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code3': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code4': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code5': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code6': [
      { type: 'required', message: 'Password is required.' },
    ],
  }

  httpOptions: any;

  constructor(
    @Inject(API_URL) private apiUrl: string,
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.inputCode = this.formBuilder.group({
      code1: ['',[Validators.required]],
      code2: ['',[Validators.required]],
      code3: ['',[Validators.required]],
      code4: ['',[Validators.required]],
      code5: ['',[Validators.required]],
      code6: ['',[Validators.required]]

    },);
   }
  ngOnInit() {
  }
  resendCode() {
    this.router.navigateByUrl('auth-manager/forgot-password');
  }
  keytab($event,prevInput, fieldInput, nextInput) {
    if(this.inputCode.value[fieldInput] !== null && this.inputCode.value[fieldInput] !== '' && this.inputCode.value[fieldInput].toString().length > 1) {
      const strSplit = this.inputCode.value[fieldInput].toString();
      this.inputCode.controls[fieldInput].setValue(strSplit[0]);
      this.inputCode.controls[nextInput].setValue(strSplit[1]);
      document.getElementById(nextInput).focus()
    } 
    if(this.inputCode.value[fieldInput] !== null && this.inputCode.value[fieldInput] !== '' && this.inputCode.value[fieldInput].toString().length === 1) {
      document.getElementById(nextInput).focus()
    }
    if (this.inputCode.value[fieldInput] === null || this.inputCode.value[fieldInput] === '') {
      document.getElementById(prevInput).focus()
    }
  }
  confirmCode() {
    var c1 = this.inputCode.get('code1').value;
    var c2 = this.inputCode.get('code2').value;
    var c3 = this.inputCode.get('code3').value;
    var c4 = this.inputCode.get('code4').value;
    var c5 = this.inputCode.get('code5').value;
    var c6 = this.inputCode.get('code6').value;
    var inputstring = (`${c1}${c2}${c3}${c4}${c5}${c6}`).toString();
    this.loadingService.present();
    this.authService.checkcodePassword({code: inputstring}).subscribe((data:any)=> {
      this.loadingService.dismiss();
      this.router.navigateByUrl("/auth-manager/new-password");
    },
    (error: any)=> {
      this.inputCode.reset();
        this.wrongCode = true;
        throw error
    })
  }
}
