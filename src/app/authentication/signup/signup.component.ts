import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/common/services/helper.service';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: any;
  dialCodeList = [] as any;
  isLoading = false;

  constructor(public helper:HelperService, 
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
     this.getDropdownData();
     this.signUpForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.email]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phone:  new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  
   // convenience getter for easy access to form fields
   get f() { return this.signUpForm.controls; }

 
  getDropdownData(){
    this.isLoading = true; 
    this.authService
        .getCountryFlagCall()
        .subscribe((res: any) =>{
              this.isLoading = false;
              this.dialCodeList = res?.data;
        }); 
  }

 
}
