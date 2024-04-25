import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddTopic } from '../../models/addTopic';
import { AddtopicComponent } from '../addtopic/addtopic.component';
import { AppService } from '../app.service';
import { DialogService } from '../dialog/dialog.service';


@Component({
  selector: 'app-lisoftopics',
  templateUrl: './lisoftopics.component.html',
  styleUrls: ['./lisoftopics.component.css']
})
export class LisoftopicsComponent implements OnInit {
  bodyText!: string;
  header!: string;
  topics: any[] = [];
  selectedTopic!: any;
  questionText!: any;
  optionText!: any;
  listOption: any[] = [];
  optionType!: number;
  topicSelection: any = 0;
  option: any = null;
  QuestionList: any[] = [];
  textAreaValue: any = null;
  QuestionNo!: any;
  inputType!: any;
  selectIndex!: any;
  testSelection: any = 0;
  selectedTest!: any;

  constructor(public modalService: DialogService, public toaster: ToastrService, public dialogRef: MatDialogRef<AddtopicComponent>, public appService: AppService) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.getAllTopics();
  }

  getQiestion() {
    if (this.topicSelection != 0 && this.QuestionNo != undefined && this.QuestionNo != "" && this.selectedTest != 0) {
      this.appService.GetQuestion(this.topicSelection, this.QuestionNo, this.selectedTest).subscribe({
        next: (res) => {
          if (res == null) {
            this.toaster.error('Question is not available', 'No Data Found!');
            return;
          }
          this.QuestionList = res;
          this.questionText = res.question;
          this.textAreaValue = res.question;
          var optionType = res.optionType.toString();
          this.option = optionType;

          this.inputType = res.type.toLowerCase();

          this.listOption = res.options;
        },
        error: (err) => {

        }
      });
    }
    else {
      this.toaster.error('Please fill required Field!', 'Field Error');
    }
  }

  testChange(index: any) {
    this.selectedTest = index.value;
  }

  getAllTopics() {
    this.appService.GetAllTopics().subscribe({
      next: (res) => {
        this.topics = res;
      },
      error: (err) => {

      }
    });
  }
  selAnswer(index: any) {
    this.selectIndex = index;
  }

  topicChange(index: any) {
    this.selectedTopic = index.value;
  }

  doTextareaValueChange(ev: any) {
    try {
      this.questionText = ev.target.value;
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }
  optionValueChange(ev: any) {
    try {
      this.optionText = ev.target.value;
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }
  addOptions() {
    this.listOption.push(this.optionText);
  }
  UpdateQuestion() {
    var addTopic = new AddTopic();
    for (var i = 0; i < this.listOption.length; i++) {
      this.listOption[i].answer = false;
    }
    this.listOption[this.selectIndex].answer = true;
    addTopic.options = this.listOption;
    addTopic.optionType = this.optionType;
    addTopic.question = this.questionText;
    addTopic.topicId = this.selectedTopic;
    addTopic.id = this.QuestionNo;

    this.appService.UpdateQueAndType(addTopic).subscribe({
      next: (res) => {
        this.listOption = [];
        this.optionType = 0;
        this.textAreaValue = null;
        this.topicSelection = 0;
        this.QuestionNo = null;
        this.option = null;
        if (res.message == "Success") {
          this.toaster.success('Successfully Done!', 'Question is Updated!');
        } else {
          this.toaster.error('Error!', 'Question is not Updated!');
        }

      },
      error: (err) => {

      }
    });


  }

  DeleteQuestion() {
    this.appService.DeleteQuestion(this.QuestionNo).subscribe({
      next: (res) => {

      },
      error: (err) => {

      }
    });
  }

  removeOption(index: any) {
    this.listOption.splice(index, 1);
  }

  open(header: any, type: string) {
    this.header = header;
    this.optionType = parseInt(type);
    this.option = type;
  }

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

}
