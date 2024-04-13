import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NavMenuService } from '../nav-menu/nav-menu.service';

@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.css']
})
export class TestTemplateComponent implements OnInit {
  topics: any[] = [];
  constructor(public appService: AppService) { }
  header!: string | null;
  topic!: string | null


  ngOnInit(): void {
    this.appService.GetAllTopicsWithTest().subscribe({
      next: (res) => {
        debugger;
        this.topics = res;
      },
      error: (err) => {

      }
    });

  }
  
  InstructionPopup(topic: any ,title: any) {
    this.header = topic+"-"+title;
    this.topic = topic;
  }
}
