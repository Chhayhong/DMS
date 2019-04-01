import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConnectionService } from 'ng-connection-service';
import { auth } from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status = "Login page";
  isConnected = true;

  form: FormGroup;
  email:AbstractControl;
  password:AbstractControl;
  erroMessage=null;
    constructor(private fb: FormBuilder,
      private auth:AuthService,
      private router: Router,
      public afAuth: AngularFireAuth,private connectionService: ConnectionService ) 
      { this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = isConnected;
        if (this.isConnected) {
          this.status = "You are online. Please login";
        }
        else {
          this.status = "You are offline. Please check connection";
        }
      })
      if(auth.canActive){
        this.router.navigate(['/apps'])
      }
     }
  
    ngOnInit() {
      this.form=this.fb.group({
        email:[null,Validators.required],
        password:[null,Validators.required],
      })
      this.email=this.form.controls["email"];
      this.password=this.form.controls["password"];
    }
    googlelogin() {
      this.auth.googleLogin().then(
        () => this.router.navigate(['/home'])
      ).then(()=>{
        this.router.navigate(['/apps'])
      }).catch(error=>{
        this.erroMessage="Login error"
      });
    }
    facebooklogin() {
      this.auth.facebooklogin();
    }
    _onCreateAccount(){
      this.router.navigate(['/register'])
    }

    login(f:any){
      if(this.form.valid){
        console.log(f)
        this.auth.signInWithEmail(f.email,f.password)
        .then(()=>{
          this.router.navigate(['/apps'])
        }).catch(error=>{
          this.erroMessage="Invalid email and password!"
        })
      }
    }
    
  }
  