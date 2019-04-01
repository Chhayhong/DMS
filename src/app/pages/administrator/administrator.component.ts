import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/store/user.store';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(public user:User) { }

  ngOnInit() {
  }

}
