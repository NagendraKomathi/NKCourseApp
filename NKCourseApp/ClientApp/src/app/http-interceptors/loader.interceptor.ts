import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService, private spinnerService: SpinnerService, public toaster: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.requestStarted();
    return next.handle(request).pipe(finalize(() => {
      setTimeout((x: any) => {
        //this.spinner.hide();
        this.spinnerService.requestEnded();
        this.spinnerService.resetSpinner();
      }, 1000);
    }));
  }
}
