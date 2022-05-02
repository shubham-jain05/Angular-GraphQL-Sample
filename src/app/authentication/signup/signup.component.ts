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
  signUpForm!: FormGroup;
  dialCodeList = [] as any;
  isLoading = false;
  submited = false;

  constructor(public helper:HelperService, 
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
     this.getDropdownData();
     this.signUpForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      dialCode: new FormControl('+91', [Validators.required]),
      phone:  new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      agree: new FormControl(false, [Validators.required]),
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

 

  onSubmit(){
    this.submited = true;
    if (this.signUpForm.invalid) {
      return;
  }
  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpForm.value));
  const payload = {
    email:this.signUpForm?.value?.email,
    password:this.signUpForm?.value?.password,
    name:this.signUpForm?.value?.name ,
    phone: this.signUpForm?.value?.dialCode + this.signUpForm?.value?.phone,
    accessType: 2
  };
  this.isLoading = true;
  this.authService
      . signUpCall(payload)
      .subscribe(response =>{
        this.isLoading = false;
        console.log(response);  
      },err=>{
        console.log(err);
      });
  }
}
