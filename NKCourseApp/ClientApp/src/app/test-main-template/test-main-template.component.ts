import { PlatformLocation } from '@angular/common';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { NavMenuService } from '../nav-menu/nav-menu.service';
declare var MediaRecorder: any;

import { RouterOutlet } from '@angular/router';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-test-main-template',
  templateUrl: './test-main-template.component.html',
  styleUrls: ['./test-main-template.component.css']
})
//@HostListener('window:popstate', ['$event'])

export class TestMainTemplateComponent implements OnInit {

  @ViewChild('recordedVideo') recordVideoElementRef!: ElementRef;
  @ViewChild('video') videoElementRef!: ElementRef;
  videoElement!: HTMLVideoElement;
  recordVideoElement!: HTMLVideoElement;
  mediaRecorder: any;
  recordedBlobs!: Blob[];
  isRecording: boolean = false;
  downloadUrl!: string;
  stream!: MediaStream;
  isTestModal: boolean = false;
  username!: string | null;
  display!: any;
  isPageLoad: boolean = false;
  intervalId!: number;
  myValue = "Hello world!";
  isFaceDetected: boolean = true;
  error: any;
  seconds: any;

  constructor(public nav: NavMenuService, public appService: AppService, public router: Router, private platformLocation: PlatformLocation, public dialog: MatDialog) {
    //document.addEventListener("visibilitychange", this.handleVisibilityChange, false);
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          this.isPageLoad = true;
          //this.router.navigate(["dashboard"]);
        } else {
          this.isPageLoad = false;
        }
      })
    //if (this.isPageLoad) {
    //  alert("sdfsd")
      
    //}
    //history.pushState(null, '', location.href);
    //this.platformLocation.onPopState(() => {
    //  history.pushState(null, '', location.href);
    //});
    this.username = localStorage.getItem("username");
    if (this.username == null) {
      this.router.navigate(['']);
    }
    this.timer(1);
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.handleVisibilityChange();
  }

  handleVisibilityChange() {
    if (document.hidden) {
      //var element1 = document.getElementById('SamePage1') as HTMLElement;
      //var element2 = document.getElementById('SamePage2') as HTMLElement;
      //var isVideo = document.getElementById("myVideo") as HTMLElement;
      //var pageError = document.getElementById("PageChanged") as HTMLElement;
      ////var visible = document.getElementById('PageChanged') as HTMLElement;
      //element1!.style!.display = "none";
      //element2!.style!.display = "none";
      //isVideo.style!.display = "none";
      this.recordVideoElementRef?.nativeElement.pause();
      this.isPageLoad = true;
      //var anchor = document.getElementById('goToHome') as HTMLElement;
      //anchor.click();
      //pageError.style.display = "block";
    } else {
      this.recordVideoElementRef?.nativeElement.pause();
      //var anchor = document.getElementById('goToHome') as HTMLElement;
      //anchor.click();
    }
  }

  ngOnInit(): void {
    this.isTestModal = true;
    this.starCamera();
    this.intervalId = window.setInterval(async () => {
      await this.loadImageDetection();
    }, 2000)
    //navigator.mediaDevices
    //  .getUserMedia({
    //    video: {
    //      width: 360
    //    }
    //  })
    //  .then(stream => {
    //    this.videoElement = this.videoElementRef?.nativeElement;
    //    this.recordVideoElement = this.recordVideoElementRef?.nativeElement;

    //    this.stream = stream;
    //    this.videoElement.srcObject = this.stream;
    //  });
    this.nav.hide();
  }
  async starCamera() {
    await this.setupDevices();
  }

  async ngAfterViewInit() {
    if (this.isTestModal)
      await this.setupDevices();
  }

  async loadImageDetection() {
    cocoSsd.load().then((model: any) => {
      model.detect(this.videoElementRef.nativeElement).then((predictions: any) => {
        //.predictionValue = predictions;
        //this.totalObjectsDetected = predictions.length;
        if (predictions.length == 0) {
          alert('Not Detected');
          this.isFaceDetected = true;
        } else if (predictions.length > 1) {
          alert('detecting more than 2 Detected');
          this.isFaceDetected = true;
        }
      });
    });;
  }

  stopCamera() {
    this.videoElementRef.nativeElement.srcObject.getTracks().forEach(function (track: any) {
      track.stop();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

  }
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.videoElementRef.nativeElement.srcObject = stream;
          this.videoElementRef.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
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
        alert("Finished");
        this.seconds = seconds;
        clearInterval(timer);
      }
    }, 1000);
  }

  

}
