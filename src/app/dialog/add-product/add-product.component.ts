import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Product } from '../../store/product.store';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/auth/auth.service';
import { IProduct } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
form: FormGroup;
filteredStates: Observable<any[]>;
states:Array<any>
firstName: AbstractControl;
lastName:AbstractControl;
enName: AbstractControl;
subName: AbstractControl;
nation:AbstractControl;
nationality:AbstractControl;
monkCertificateNumber:AbstractControl;
birthOfDate:AbstractControl;
village:AbstractControl;
commune:AbstractControl;
district:AbstractControl;
province:AbstractControl;
bMvillage:AbstractControl;
bMcommune:AbstractControl;
bMdistrict:AbstractControl;
bMprovince:AbstractControl;
beMonkDate:AbstractControl;

localCertificateNumber:AbstractControl;
localCertificateDate:AbstractControl;
localCertificateChief:AbstractControl;
localCertificateDistrict:AbstractControl;
localCertificateProvince:AbstractControl;

presentAddress:AbstractControl;
category:AbstractControl;
constructor(
  public dialogRef: MatDialogRef<AddProductComponent>,
  @Inject(MAT_DIALOG_DATA)
  public data: any,
  public fb: FormBuilder,
  public store: Product, 
  private db: AngularFirestore,
  private auth: AuthService,
  private dialog: MatDialog,
  private _formBuilder: FormBuilder
) { }
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
isOptional = false;
ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ''
  });


  this.form = this.fb.group({
    firstName: [null,Validators.nullValidator],
    lastName: [null,Validators.nullValidator],
    enName: [null,Validators.nullValidator],
    subName: [null,Validators.nullValidator],
    nation: [null,Validators.nullValidator],
    nationality: [null,Validators.nullValidator],

    monkCertificateNumber: [null,Validators.nullValidator],
    birthOfDate: [null,Validators.nullValidator],
    beMonkDate: [null,Validators.nullValidator],
    birthOfPlace: [null,Validators.nullValidator],

    localCertificateNumber: [null,Validators.nullValidator],
    localCertificateDate: [null,Validators.nullValidator],
    localCertificateChief: [null,Validators.nullValidator],
    localCertificateDistrict: [null,Validators.nullValidator],
    localCertificateProvince: [null,Validators.nullValidator],

    presentAddress: [null,Validators.nullValidator],

    village: [null,Validators.nullValidator],
    commune: [null,Validators.nullValidator],
    district: [null,Validators.nullValidator],
    province: [null,Validators.nullValidator],

    bMvillage: [null,Validators.nullValidator],
    bMcommune: [null,Validators.nullValidator],
    bMdistrict: [null,Validators.nullValidator],
    bMprovince: [null,Validators.nullValidator],
    category:[null,Validators.nullValidator],
    
  })
  this.firstName = this.form.controls["firstName"];
  this.lastName = this.form.controls["lastName"];
  this.enName = this.form.controls["enName"];
  this.subName = this.form.controls["subName"];
  this.nation = this.form.controls["nation"];
  this.nationality = this.form.controls["nationality"];

  this.monkCertificateNumber = this.form.controls["monkCertificateNumber"];
  this.birthOfDate = this.form.controls["birthOfDate"];
  this.beMonkDate = this.form.controls["beMonkDate"];
  this.bMvillage = this.form.controls["bMvillage"];
  this.bMcommune = this.form.controls["bMcommune"];
  this.bMdistrict = this.form.controls["bMdistrict"];
  this.bMprovince = this.form.controls["bMprovince"];

  this.village = this.form.controls["village"];
  this.commune = this.form.controls["commune"];
  this.district = this.form.controls["district"];
  this.province = this.form.controls["province"];

  this.localCertificateNumber = this.form.controls["localCertificateNumber"];
  this.localCertificateDate = this.form.controls["localCertificateDate"];
  this.localCertificateChief = this.form.controls["localCertificateChief"];
  this.localCertificateDistrict = this.form.controls["localCertificateDistrict"];
  this.localCertificateProvince = this.form.controls["localCertificateProvince"];
  // this.presentAddress = this.form.controls["presentAddress"];
  this.category = this.form.controls["category"];
  this.store.fetchCatgory(list=>{
    this.states=list;
    
    this.filteredStates = this.category.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
        })
      }
    
      private _filterStates(value: any): any[] {
        const filterValue =value?value.key?value.wat:value.toLowerCase():null; 
    
        return this.states.filter(state => 
          state.wat &&  state.wat.toLowerCase().indexOf(filterValue) === 0);
      }
      displayFn(user?: any): string | undefined {
        return user ? user.wat : undefined;
      
}

_onSave(f:any){
  if(this.form.valid){
    this.form.disable();
    const{firstName,lastName,enName,subName,nation, 
      nationality,monkCertificateNumber,birthOfDate,
      birthOfPlace,beMonkDate,bMvillage,
      bMcommune,bMdistrict,bMprovince,village,commune,district,province,localCertificateNumber,
      localCertificateDate,localCertificateChief,
      localCertificateDistrict,localCertificateProvince,category}=f;
    const item:IProduct = {
      key: this.db.createId(),
      createBy: this.auth.getUser(),
      createDate: new Date(),
      firstName: firstName,lastName:lastName,
      enName:enName,subName:subName,nation:nation, nationality:nationality,
      monkCertificateNumber:monkCertificateNumber,birthOfDate:birthOfDate,
      birthOfPlace:birthOfPlace,beMonkDate:beMonkDate,bMvillage:bMvillage,bMcommune:bMcommune,bMdistrict:bMdistrict,bMprovince:bMprovince,village:village,commune:commune,
      district:district,province:province,localCertificateNumber:localCertificateNumber,localCertificateDate:localCertificateDate,
      localCertificateChief:localCertificateChief,localCertificateDistrict:localCertificateDistrict,localCertificateProvince:localCertificateProvince,category:category
    }
    this.store.add(item).then(()=>{
      this.form.reset();
      this.form.enable();
    }).catch(error=>{
      alert(error);
      this.form.enable();
    })
  }
}

}
