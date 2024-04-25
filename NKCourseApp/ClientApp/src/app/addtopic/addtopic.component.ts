import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddTopic } from '../../models/addTopic';
import { QueOption } from '../../models/QueOption';
import { AppService } from '../app.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.css']
})
export class AddtopicComponent implements OnInit {
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
  inputType!: any;
  selectIndex!: any;
  testSelection: any = 0;
  selectedTest!: any;
  totalQuestion: any = 0;

  textAreaValue: any = null;

  constructor(public modalService: DialogService, public toaster: ToastrService, public appService: AppService) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.getAllTopics();
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

 
  topicChange(index: any) {
    this.selectedTopic = index.value;
  }
  testChange(index: any) {
    this.selectedTest = index.value;
    this.appService.GetQuestionCount(this.selectedTopic, this.selectedTest).subscribe({
      next: (res) => {
        this.totalQuestion = res;
      },
      error: (err) => {

      }
    });
  }

  doTextareaValueChange(ev:any) {
    try {
      this.questionText = ev.target.value;
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }
  optionValueChange(ev:any) {
    try {
      this.optionText = ev.target.value;
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }
  addOptions() {
    var opt = new QueOption();
    opt.option = this.optionText;
    opt.answer = false
    this.listOption.push(opt);
  }
  SaveQuestion() {
    var addTopic = new AddTopic();
    this.listOption[this.selectIndex].answer = true;
    addTopic.options = this.listOption;
    addTopic.optionType = this.optionType;
    addTopic.question = this.questionText;
    addTopic.topicId = this.selectedTopic;

    this.appService.InsertQueAndType(addTopic, this.selectedTest).subscribe({
      next: (res) => {
        this.listOption = [];
        this.optionType = 0;
        this.textAreaValue = null;
        this.topicSelection = 0;
        this.option = null;
        if (res.message == "Success") {
          this.toaster.success('Question is Added!', 'Successfully Done!');
        } else {
          this.toaster.error('Question is not Added!', 'Error!');
        }
      },
      error: (err) => {

      }
    });


  }

  removeOption(index: any) {
    alert(index)
    this.listOption.splice(index, 1);
  }

  open(header: any, type: string, input: string) {
    this.listOption = [];
    this.inputType = input;
    this.header = header;
    this.optionType = parseInt(type);
    this.option = type;
  }

  selAnswer(index: any) {
    this.selectIndex = index;
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
