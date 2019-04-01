import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/store/user.store';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  constructor(public user:User,public auth:AuthService, private route:Router) { }

  ngOnInit() {
    
  }
  logOut(){
    this.auth.signOut();
  }
}
