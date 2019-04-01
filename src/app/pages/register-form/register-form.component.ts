import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
form:FormGroup;
firstName:AbstractControl;
lastName:AbstractControl;
  constructor() { }

  ngOnInit() {
  }

}
