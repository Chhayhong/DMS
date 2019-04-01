import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { Product } from 'src/app/store/product.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
export interface levels {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent implements OnInit {
  levels: levels[] = [
    { value: 'ភិក្ខុ', viewValue: 'ភិក្ខុ' },
    { value: 'សាមណេរ', viewValue: 'សាមណេរ' },
  ];
  monkLevel: string;
  checklevel: string[] = ['ភិក្ខុ', 'សាមណេរ'];

  lastName: AbstractControl;
  firstName: AbstractControl;
  process: boolean;
  subName: AbstractControl;
  level: AbstractControl;
  birthOfDate: AbstractControl;
  beMonkDate: AbstractControl;
  monkCertificateNumber: AbstractControl;
  village: AbstractControl;
  commune: AbstractControl;
  district: AbstractControl;
  province: AbstractControl;
  livingIn: AbstractControl;
  phone: AbstractControl;
  form: FormGroup;
  constructor(public fb: FormBuilder, public store: Product,
    private db: AngularFirestore,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      lastName: [null, Validators.required],
      firstName: [null, Validators.required],

      // enName: [null, Validators.required],
      subName: [null, Validators.required],
      level: [null, Validators.required],
      birthOfDate: [null, Validators.required],
      beMonkDate: [null, Validators.required],
      monkCertificateNumber: [null, Validators.required],
      village: [null, Validators.nullValidator],
      commune: [null, Validators.nullValidator],
      district: [null, Validators.nullValidator],
      province: [null, Validators.nullValidator],
      livingIn: [null, Validators.nullValidator],
      phone: [null, Validators.nullValidator],
    })
    this.lastName = this.form.controls["lastName"];
    this.firstName = this.form.controls["firstName"];

    // this.enName = this.form.controls["enName"];
    this.level = this.form.controls["level"];
    this.subName = this.form.controls["subName"];
    this.birthOfDate = this.form.controls["birthOfDate"];
    this.beMonkDate = this.form.controls["beMonkDate"];
    this.village = this.form.controls["village"];
    this.commune = this.form.controls["commune"];
    this.district = this.form.controls["district"];
    this.province = this.form.controls["province"];
    this.livingIn = this.form.controls["livingIn"];
    this.phone = this.form.controls["phone"];
    this.monkCertificateNumber = this.form.controls["monkCertificateNumber"];
  }
  _onSave(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { lastName, firstName, enName, subName, level, birthOfDate,
        beMonkDate, monkCertificateNumber, village, commune, district, province, livingIn, phone } = f;
      const item: IProduct = {
        key: this.db.createId(),
        createBy: this.auth.getUser(),
        createDate: new Date(),
        lastName: lastName, firstName: firstName,
        subName: subName, level: level, birthOfDate: birthOfDate, beMonkDate: beMonkDate,
        village: village, commune: commune,
        district: district, province: province, livingIn: livingIn,
        monkCertificateNumber: monkCertificateNumber, phone: phone,
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
