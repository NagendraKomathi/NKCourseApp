import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { SpinnerService } from "../spinner/spinner.service";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor
{
  //constructor(private service: SpinnerService) { }
  //intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  this.service.requestStarted();
  //  //console.log('Auth Intercept Provider');
  //  //console.log(request.url);
  //  //const authToken = "My Auth Token";
  //  //const authReq = request.clone({ setHeaders: { Authorization: authToken } });
  //  return this.handler(next, request)
  //}

  //handler(next: any, request: any) {
  //  return next.handle(next, request)
  //    .pipe(
  //      tap(
  //        (event) => {
  //          if (event instanceof HttpResponse) {
  //            this.service.requestEnded();
  //          }
  //        },
  //        (error: AuthHeaderInterceptor) => {
  //          this.service.resetSpinner();
  //          throw error;
  //        }
  //      )
  //    )
  //}
  constructor(private service: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const localToken = localStorage.getItem('jwt');
    request = request.clone({ headers: request.headers.set('Authentication', 'bearer' + localToken ) })

    return next.handle(request)
  }
}
