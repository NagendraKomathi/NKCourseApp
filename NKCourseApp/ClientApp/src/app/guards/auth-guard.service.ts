import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean = false;
  userName!: string | null;

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('username');
      //this.router.navigate(['dashboard']);
      return true;
    }
    this.router.navigate(['login']);
    this.isLoggedIn = false;
    return false;
  }
}
