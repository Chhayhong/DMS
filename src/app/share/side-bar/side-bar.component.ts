import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/store/user.store';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  panelOpenState = false;
  constructor(public user:User,public auth:AuthService, private route:Router) { }

  ngOnInit() {
    
  }
  logOut(){
    this.auth.signOut();
  }
}
