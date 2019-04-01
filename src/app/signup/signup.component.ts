import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private myService: AuthService) { }

  ngOnInit() {
  }

  onSignup(formData){
    this.myService.emailSignUp(formData.value.email, formData.value.password);
  }

}