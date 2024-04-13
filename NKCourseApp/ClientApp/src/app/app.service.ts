import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddTopic } from '../models/addTopic';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:7070';
  }

  login(loginModel: Login) {
    return this.http.post<any>(this.baseUrl + "/api/account/GetUserLogin", loginModel, { withCredentials: true });
  }
  LoginAuth(loginModel: Login) {
    return this.http.post<any>(this.baseUrl + "/api/account/LoginAuthentication", loginModel, { withCredentials: true });
  }

  private userName = new BehaviorSubject<string | null>(localStorage.getItem('username'));

  get currentUser() {
    return this.userName.asObservable();
  }
  GetProfile(emailid: any) {
    return this.http.get<any>(this.baseUrl + "/api/profile/GetProfileInfo?email=" + emailid);
  }
  GetAllTopics() {
    return this.http.get<any>(this.baseUrl + "/api/Question/GetAllTopics");
  }

  GetAllTopicsWithTest() {
    return this.http.get<any>(this.baseUrl + "/api/Question/GetAllTopicsWithTest");
  }

  InsertQueAndType(questions: AddTopic, selectedTest: number) {
    return this.http.post<any>(this.baseUrl + "/api/Question/SaveQuestion?SelectedTest=" + selectedTest, questions, { withCredentials: true });
  }

  GetQuestionCount(selectedTopic: number, selectedTest: number) {
    return this.http.get<any>(this.baseUrl + "/api/Question/GetQuestionCount?selectedTopic=" + selectedTopic + "&selectedTest=" + selectedTest);
  }

  UpdateQueAndType(questions: AddTopic) {
    return this.http.post<any>(this.baseUrl + "/api/Question/UpdateQuestion", questions, { withCredentials: true });
  }
  DeleteQuestion(questionNo: number) {
    return this.http.get<any>(this.baseUrl + "/api/Question/DeleteQuestion?QuestionNo=" + questionNo);
  }

  GetQuestion(selectedTopic: any, questionNo: number) {
    return this.http.get<any>(this.baseUrl + "/api/Question/GetQuestion?selectedTopic=" + selectedTopic + "&QuestionNo=" + questionNo );
  }

}
