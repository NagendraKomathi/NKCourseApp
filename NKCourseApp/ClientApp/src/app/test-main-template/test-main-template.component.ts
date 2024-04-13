import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { NavMenuService } from '../nav-menu/nav-menu.service';

@Component({
  selector: 'app-test-main-template',
  templateUrl: './test-main-template.component.html',
  styleUrls: ['./test-main-template.component.css']
})
@HostListener('window:popstate', ['$event'])

export class TestMainTemplateComponent implements OnInit {
  username!: string | null;
  display!: any;
  
  constructor(public nav: NavMenuService, public appService: AppService, router: Router) {
    this.username = localStorage.getItem("username");
    this.timer(30);
  }

  ngOnInit(): void {
    this.nav.hide();
  }

  @HostListener('window:popstate', ['$event']) onClickBack(event: PopStateEvent) {
    history.pushState(null, document.title, location.href);
    
  }

  timer(minute:any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 60;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }

}
