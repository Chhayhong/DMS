import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IPhnomPenh } from 'src/app/interfaces/phnompenh';
import {  PhnomPenh } from 'src/app/store/phnompenh.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-phnom-penh',
  templateUrl: './phnom-penh.component.html',
  styleUrls: ['./phnom-penh.component.scss']
})
export class PhnomPenhComponent implements OnInit {
  pvillage: AbstractControl;
  pcommune: AbstractControl;
  pdistrict: AbstractControl;
  pprovince: AbstractControl;
  form:FormGroup;
  constructor(public fb: FormBuilder, public store: PhnomPenh,
    private db: AngularFirestore,
    private auth: AuthService,) { }

  ngOnInit() {
    this.form=this.fb.group({
      pvillage:[null,Validators.required],
      pcommune:[null,Validators.required],
      pdistrict:[null,Validators.required],
      pprovince:[null,Validators.required]
  })
  this.pvillage=this.form.controls["pvillage"];
  this.pcommune=this.form.controls["pcommune"];
  this.pdistrict=this.form.controls["pdistrict"];
  this.pprovince=this.form.controls["pprovince"];
  }
  _onSave(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { pvillage, pcommune, pdistrict, pprovince } = f;
      const item: IPhnomPenh = {
        key: this.db.createId(),
        createBy: this.auth.getUser(),
        createDate: new Date(),
        pvillage: pvillage, pcommune: pcommune,
        pdistrict: pdistrict, pprovince: pprovince
      }
      this.store.add(item).then(() => {
        this.form.reset();
        this.form.enable();
      }).catch(error => {
        alert(error);
        this.form.enable();
      })
    }
  }
}

