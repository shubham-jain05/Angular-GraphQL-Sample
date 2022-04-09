import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/common/services/helper.service';
import { HttpCallService } from 'src/app/common/services/http-call.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  selected = '+91';
  forgotPasswordMode = false;
  forgotPasswordEmail: string = '';
  isLoading: boolean = false;
  submited = false;
  message = '';

  constructor(
    // private translate: TranslateService,
     public helper:HelperService,
     private formBuilder: FormBuilder,
     public auth: AuthService,
     private router:Router,
     private storage: StorageService
    ) 
    {
      //this.translate.use('en_US');
      this.loginForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email,  Validators.maxLength(50)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
        rememberPassword: new FormControl(false, [Validators.required]),
      });
    }

  ngOnInit(): void {
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submited = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    const payload = {
      email:this.loginForm?.value?.email,
      password:this.loginForm?.value?.password  
    };
    this.isLoading = true;

    this.auth
        .loginCall(payload)
        .subscribe((response:any) =>{
          this.isLoading = false;
          if(!!response?.data?.token){
            this.storage.setValueInLocalStorage('token',response?.data?.token);
            this.router.navigate(['/layout/admin/parent/dashboard']);          
          } else {
            this.message = response?.message;
          } 
        }, err=>{
          this.isLoading = false;
          this.message = err?.error?.error || err?.error?.message;
        });
  }


  
}
