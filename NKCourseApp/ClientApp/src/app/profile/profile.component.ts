import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username!: string | null;
  role!: string | null;
  address!: string | null;
  emailid!: string | null;
  phoneNumber!: string | null;

  constructor(public appService: AppService) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.emailid = localStorage.getItem('emailid');
    this.appService.GetProfile(this.emailid).subscribe({
      next: (res) => {
        var data = res;
        this.role = data.roleName;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
      },
      error: (err) => {
        
      }
    });
  }


}
