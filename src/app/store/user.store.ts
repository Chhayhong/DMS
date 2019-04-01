import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class User {
  @observable 
  public user;
  constructor(private ds:DataService,
    private auth:AuthService){
        this.fetchUser();
  }
  @action
  fetchUser(){
      this.user=this.auth.getUser();
  }
}