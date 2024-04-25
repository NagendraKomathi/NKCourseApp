import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { AuthGuardService } from '../guards/auth-guard.service';
import { NavMenuService } from './nav-menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isLogout: boolean = false;
  username!: Observable<string | null>;
  status: boolean = true;
  clickEvent() {
    this.status = !this.status;
  }

  constructor(public route: Router, public auth: AuthGuardService, public nav: NavMenuService, public appService: AppService) {
    
  }

  ngOnInit() {
    this.username = this.appService.currentUser;
  }


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    this.auth.isLoggedIn = false;
    this.route.navigate(['']);
  }

}
