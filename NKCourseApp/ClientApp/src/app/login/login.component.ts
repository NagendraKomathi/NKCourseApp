import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { interval, takeUntil, timer } from 'rxjs';
import { Login } from '../../models/login';
import { AppService } from '../app.service';
import { AuthGuardService } from '../guards/auth-guard.service';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titleEn = '';
  titleAr = '';
  msgEn = '';
  msgAr = '';
  lanauge = 'en';
  placeholderTitle = 'Enter toastr title';
  placeholderMsg = 'Enter message';
  showPassword: boolean = false;


  loginForm!: FormGroup;
  submitted = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private loginModel: Login, private spinnerService: NgxSpinnerService, private appService: AppService,
    private router: Router, private service: SpinnerService, public toaster: ToastrService, public auth: AuthGuardService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailid: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginModel.EmailId = this.loginForm.value.emailid;
      this.loginModel.Password = this.loginForm.value.password;

      this.appService.LoginAuth(this.loginModel).subscribe({
        next: (res) => {
          const token = (<any>res).token;
          const username = (<any>res).user;
          var email = this.loginForm.value.emailid;
          localStorage.setItem('jwt', token);
          localStorage.setItem('username', username);
          localStorage.setItem('emailid', email);
          this.invalidLogin = false;
          this.router.navigate(['dashboard']);
          this.showSuccess();
        },
        error: (err) => {
          debugger;
          this.invalidLogin = true;
          this.showError();
        }
      });

      //this.appService.login(this.loginModel).subscribe({
      //  next: (res) => {
      //    alert(res.message);
      //    this.spinnerService.hide();
      //    this.router.navigate(['home']);
      //  },
      //  error: (err) => {
      //    alert(err?.error.message)
      //  }
      //});
    }
  }
  //showToaster() {
  //  this.toasterService.dispatchToaster()
  //  let toasterWaitFor$ = timer(10000);
  //  let toasterInterval$ = interval(1000).pipe(
  //    takeUntil(toasterWaitFor$)
  //  )
  //  let subscription = toasterInterval$.subscribe(
  //    res => console.log('Toaster wait for ', res),
  //    err => console.log('Toaster wait for ', err),
  //    () => {
  //      this.toasterService.dismissToaster()
  //    }
  //  )
  //}
  public showSuccess(): void {
    this.toaster.success('Successfully Done!', 'Login!');
  }

  public showInfo(): void {
    this.toaster.info('Message Info!', 'Title Info!');
  }

  public showWarning(): void {
    this.toaster.warning('Message Warning!', 'Title Warning!');
  }

  public showError(): void {
    this.toaster.error('Invalid Credentials!', 'Unautherized!');
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }



}
