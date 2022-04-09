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

  parseJwt (token:any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
}
