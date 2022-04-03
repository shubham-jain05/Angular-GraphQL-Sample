import { Injectable } from '@angular/core';
import { HttpCallService } from 'src/app/common/services/http-call.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:9000/';
  constructor(private http: HttpCallService ) { }

  loginCall(payload: any){
    return this.http.post(this.url+'signIn', payload);
  }

  signUpCall(payload: any){
    return this.http.post(this.url+'signUp', payload);
  }

  forgetPasswordCall(payload: any){
    return this.http.post(this.url+'signIn', payload); 
  }

 

  getCountryFlagCall(){
    return this.http.get("../../../assets/json/countryCodeFlag.json")
  }
}
