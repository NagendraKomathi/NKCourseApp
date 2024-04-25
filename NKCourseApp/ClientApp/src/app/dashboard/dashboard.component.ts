import { Component, OnInit } from '@angular/core';
import { NavMenuService } from '../nav-menu/nav-menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public nav: NavMenuService) { }

  ngOnInit(): void {
    this.nav.show();
  }

}
