import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppService } from '../app.service';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import * as faceapi from 'face-api.js';
import { RouterOutlet } from '@angular/router';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { MatDialog } from '@angular/material/dialog';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.css']
})
export class TestTemplateComponent implements OnInit {
  @ViewChild('video') videoElementRef!: ElementRef;
  @ViewChild('recordedVideo') recordVideoElementRef!: ElementRef;
  @ViewChild('canvas', { static: true })
  public canvasRef!: ElementRef;
  videoElement!: HTMLVideoElement;
  recordVideoElement!: HTMLVideoElement;
  stream!: MediaStream;
  isTestModal: boolean = false;
  topics: any[] = [];
  elem: any;
  canvas: any;
  canvasEl: any;
  toggleClass = 'ft-maximize';
  public config: any = {};
  error: any;
  intervalId!: number;
  detection: any;
  resizedDetections: any;
  displaySize: any;
  videoInput: any;
  isFaceDetected: boolean = true;
  result: string = '';

  constructor(private elRef: ElementRef, public appService: AppService, public nav: NavMenuService, @Inject(DOCUMENT) private document: any, public router: Router,
    public dialog: MatDialog, private primengConfig: PrimeNGConfig) {
    
  }
  header!: string | null;
  topic!: string | null

  ngOnInit() {
    this.nav.show();
   this.primengConfig.ripple = true; 
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

    this.elem = document.documentElement;
    this.appService.GetAllTopicsWithTest().subscribe({
      next: (res) => {
        this.topics = res;
      },
      error: (err) => {

      }
    });
  }

  async openCameraTest() {
    this.isTestModal = true;
    this.starCamera();

    this.intervalId = window.setInterval(async () => {
        await this.loadImageDetection();      
    }, 1000)
  }

  async loadImageDetection() {
    cocoSsd.load().then((model: any) => {
      model.detect(this.videoElementRef.nativeElement).then((predictions: any) => {
        //.predictionValue = predictions;
        //this.totalObjectsDetected = predictions.length;
        if (predictions.length == 0) {
          //alert('Not Detected');
          this.isFaceDetected = true;
        } else if (predictions.length > 1) {
          alert('detecting more than 2 Detected');
          this.isFaceDetected = true;
        } else {
          if (this.isFaceDetected)
            alert("Face is detected, Please proceed the test.");
          this.isFaceDetected = false;
        }
      });
    });;
  }

  closeModel() {
    clearInterval(this.intervalId);
    this.stopCamera();
    this.isTestModal = false;
    this.isFaceDetected = true;
  }

  ngOnDestroy(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId);
    }
    
  }

  TestClose() {
    clearInterval(this.intervalId);
    this.stopCamera();
    this.isTestModal = false;
    this.isFaceDetected = true;
  }

  async starCamera() {
    await this.setupDevices();
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

  // turn off device camera 
  stopCamera() {
    this.videoElementRef.nativeElement.srcObject.getTracks().forEach(function (track: any) {
      track.stop();
    });
  }

  async ngAfterViewInit() {
    if (this.isTestModal)
      await this.setupDevices();
  }

  //startVideo() {
  //  navigator.mediaDevices
  //    .getUserMedia({
  //      video: {
  //        width: 360
  //      }
  //    })
  //    .then(stream => {
  //      this.videoElement = this.videoElementRef?.nativeElement;
  //      this.videoInput = this.videoElementRef?.nativeElement;
  //      this.recordVideoElement = this.recordVideoElementRef?.nativeElement;
  //      this.stream = stream;
  //      this.videoElement.srcObject = this.stream;
  //    });
  //    this.videoElementRef.nativeElement.querySelector('video')?.addEventListener('play', async () => {
  //    this.canvas = await faceapi.createCanvasFromMedia(this.videoElement);
  //    this.canvasEl = this.canvasRef?.nativeElement;
  //    this.canvasEl?.appendChild(this.canvas);
  //    this.canvas.setAttribute('id', 'canvass');
  //    this.canvas.setAttribute(
  //      'style', `position: fixed;
  //       top: 0;
  //       left: 0;`
  //    );
  //    this.displaySize = {
  //      width: this.videoElement?.width,
  //      height: this.videoElement?.height,
  //    };
  //    faceapi.matchDimensions(this.canvas, this.displaySize);
  //    setInterval(async () => {
  //      this.detection = await faceapi.detectAllFaces(this.videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  //      if (this.detection != undefined) {
  //        this.resizedDetections = faceapi.resizeResults(
  //          this.detection,
  //          this.displaySize
  //        );
  //      }
  //      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  //      faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
  //      faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
  //      faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);
  //    }, 100);
  //  });
  //}

  //async videoCapture() {
  //  await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
  //  await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
  //  await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
  //  await faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),]).then(() => this.startVideo());
  //}

  //async detect_Faces() {
    
  //}


  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])

  

  fullscreenmode() {

    if (this.toggleClass == 'ft-minimize') {
      this.toggleClass = 'ft-maximize';
    }
    else {
      this.toggleClass = 'ft-minimize';
    }
    console.log(this.toggleClass)
  }

  openFullscreen() {
    this.router.navigate(['testmaintemplate']);
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.toggleClass = 'ft-maximize';
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
      //this.toggleClass = 'ft-maximize';
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
      //this.toggleClass = 'ft-maximize';
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
      //this.toggleClass = 'ft-minimize';
    }
  }

  
  InstructionPopup(topic: any ,title: any) {
    this.header = topic+"-"+title;
    this.topic = topic;
  }
}
