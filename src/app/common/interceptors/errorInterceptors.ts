import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { HelperService } from "../services/helper.service";
import { eApiErrorMessages } from "../constant/eApiErrorMessages";

@Injectable()

export class ErrorIntercept implements HttpInterceptor {

    constructor(
        private readonly helper: HelperService,
        private readonly storage: StorageService,
        private readonly router: Router
    ) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "";
                if (error.error instanceof ErrorEvent) {
                    if (!!error.error.message) {
                        this.helper.handlErrorResponse(error.error);
                    }
                } else {
                    console.log("in error inter -->", error);
                    switch (error.status) {
                        case 400: {
                            console.log(`Error Status: ${error.status}`);
                            this.helper.handlErrorResponse(error);
                            break;
                        }
                        case 401: {
                            console.log(
                                `Error Status: ${error.status}\nMessage: ${eApiErrorMessages.api401Error}`
                            );
                            this.storage.clearAllValueFromStorage();
                            this.router.navigate(["/authentication/Login"]);
                            break;
                        }
                        case 403: {
                            console.log(
                                `Error Status: ${error.status}\nMessage: ${eApiErrorMessages.api403Error}`
                            );
                            break;
                        }
                        case 405: {
                            console.log(
                                `Error Status: ${error.status}\nMessage: ${eApiErrorMessages.api405Error}`
                            );
                            break;
                        }
                        case 409: {
                            console.log(
                                `Error Status: ${error.status}\nMessage: ${eApiErrorMessages.api409Error}`
                            );
                            break;
                        }
                        case 422: {
                            console.log(
                                `Error Status: ${error.status}\nMessage: ${eApiErrorMessages.api422Error}`
                            );
                            // this.helper.handlErrorResponse(error.error);
                            break;
                        }
                        case 500: {
                            console.log(
                                `Error Status: ${error.status}\nMessage: ${eApiErrorMessages.api500Error}`
                            );
                            break;
                        }
                        case 501: {
                            console.log(
                                `Error Status: ${error.status}\nMessage: ${eApiErrorMessages.api501Error}`
                            );
                            break;
                        }
                        default: {
                            console.log(eApiErrorMessages.apiNoClueError);
                            break;
                        }
                    }
                }
                return throwError(error);
            })
        );
    }
}
