import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { HeaderConstant } from '../constant/headerConsant';

@Injectable()
export class headerInterceptor implements HttpInterceptor {
  constructor(
    private readonly storage: StorageService
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!!this.storage.getValueFromLocalStorage('token')) {
      const token = 'Berror '.concat(
        this.storage.getValueFromLocalStorage('token')
      );
    if (!!token) {
        httpRequest = httpRequest.clone({
          headers: httpRequest.headers
            .set(HeaderConstant.authorization, token)
            // .set(this.headerConstant.request, Guid.create().toString())
            // .set(this.headerConstant.userId, LoginUser['AdminId'])
            // .set(this.headerConstant.actionBy, LoginUser['email']),
        });
      }
    } 

    return next.handle(httpRequest);
    
  }
}
