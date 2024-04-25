import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
  import { RouterModule } from '@angular/router';
  import { JwtModule } from '@auth0/angular-jwt';
  import { AppComponent } from './app.component';
  import { NavMenuComponent } from './nav-menu/nav-menu.component';
  import { HomeComponent } from './home/home.component';
  import { CounterComponent } from './counter/counter.component';
  import { FetchDataComponent } from './fetch-data/fetch-data.component';
  import { CandidateComponent } from './candidate/candidate.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppService } from './app.service';
import { Login } from '../models/login';
import { AuthGuardService } from './guards/auth-guard.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { AuthHeaderInterceptor } from './http-interceptors/auth-header-interceptor';
import { LoaderInterceptor } from './http-interceptors/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LisoftopicsComponent } from './lisoftopics/lisoftopics.component';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { PopupTestComponent } from './popup-test/popup-test.component';
import { TestTemplateComponent } from './test-template/test-template.component';
import { TestMainTemplateComponent } from './test-main-template/test-main-template.component';
import { NavMenuService } from './nav-menu/nav-menu.service';
import { PreventUnsaveChanges } from './guards/prevent-unsaved-changes.guard';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from './dialog/dialog.service';
import { MatNativeDateModule } from '@angular/material/core';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CandidateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AddtopicComponent,
    SpinnerComponent,
    DialogTemplateComponent,
    LisoftopicsComponent,
    TestTemplateComponent,
    TestMainTemplateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    //FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    PortalModule,
    ToastrModule.forRoot({
      timeOut: 2000, // 20 seconds
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      //{ path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'candidate', component: CandidateComponent },
      //{ path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'addtopic', component: AddtopicComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'listftopics', component: LisoftopicsComponent, canActivate: [AuthGuardService] },
      { path: 'popuptemplate', component: PopupTestComponent, canActivate: [AuthGuardService] },
      { path: 'testtemplate', component: TestTemplateComponent, canActivate: [AuthGuardService] },
      { path: 'testmaintemplate', component: TestMainTemplateComponent, canDeactivate: [PreventUnsaveChanges] }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [""],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [AppService, Login, AuthGuardService, SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ToastrService, DialogService, 
      {
        provide: MatDialogRef,
      useValue: {}
    }, NavMenuService,
    PreventUnsaveChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
