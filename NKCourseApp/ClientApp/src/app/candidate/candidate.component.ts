import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  candidateForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private spinnerService: NgxSpinnerService, private appService: AppService, private jwtHelper: JwtHelperService) {
  }

  isUserAuthenticated() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      emailid: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    });
  }

  get f() { return this.candidateForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.candidateForm.valid) {
      //this.appService.login(this.candidateForm.);
    } 
  }

}
