import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/store/user.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public user:User,public auth:AuthService, private route:Router) { }
  panelOpenState = false;
  ngOnInit() {
  }
  logOut(){
    this.auth.signOut()
  }
}
