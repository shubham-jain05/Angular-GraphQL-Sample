import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpCallService } from './common/services/http-call.service';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvServiceProvider } from 'src/environments/env.service.provider';
import { ErrorIntercept } from './common/interceptors/errorInterceptors';
import { headerInterceptor } from './common/interceptors/headerInterceptor';
import { LoaderInterceptor } from './common/interceptors/loaderInterceptor.service';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    GraphQLModule
  ],
  providers: [
    HttpCallService,
    EnvServiceProvider,
    { provide: HTTP_INTERCEPTORS, useClass: headerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
