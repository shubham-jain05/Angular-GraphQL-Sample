import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
   
  constructor(private readonly storage: StorageService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.storage.getValueFromLocalStorage('token');      
    if(!!token){
      return true;
    }else{
      this.route.navigate(['']);
      return false;
    }   
  }
}
