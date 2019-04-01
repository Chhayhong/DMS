import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Product } from 'src/app/store/product.store';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IProduct } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form:FormGroup;
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
  category:AbstractControl;
  localCertificateNumber:AbstractControl;
  localCertificateDate:AbstractControl;
  localCertificateChief:AbstractControl;
  localCertificateDistrict:AbstractControl;
  localCertificateProvince:AbstractControl;
  process:boolean;
  filteredStates: Observable<any[]>;
  states:Array<any>
  constructor(   public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private SnackBar: MatSnackBar,
    public store: Product,
    private fb:FormBuilder,private auth: AuthService, private _formBuilder: FormBuilder,
  ) { }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = true;
  
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
    this.form=this.fb.group({
      firstName:[this.data.firstName,Validators.required],
      lastName:[this.data.lastName,Validators.required],
      enName:[this.data.enName,Validators.required],
      subName:[this.data.subName,Validators.required],

      nation:[this.data.nation,Validators.required],
      nationality:[this.data.nationality,Validators.required],
      category:[this.data.category,Validators.required],
      monkCertificateNumber:[this.data.monkCertificateNumber,Validators.nullValidator],
      birthOfDate:[this.data.category,Validators.required],

      village:[this.data.village,Validators.required],
      commune:[this.data.commune,Validators.required],
      district:[this.data.district,Validators.required],
      province:[this.data.province,Validators.required],

      bMvillage:[this.data.bMvillage,Validators.required],
      bMcommune:[this.data.bMcommune,Validators.required],
      bMdistrict:[this.data.bMdistrict,Validators.required],
      bMprovince:[this.data.bMprovince,Validators.required],
      beMonkDate:[this.data.beMonkDate,Validators.required],

      localCertificateNumber:[this.data.localCertificateNumber,Validators.required],
      localCertificateDate:[this.data.localCertificateDate,Validators.required],
      localCertificateChief:[this.data.localCertificateChief,Validators.required],
      localCertificateDistrict:[this.data.localCertificateDistrict,Validators.required],
      localCertificateProvince:[this.data.localCertificateProvince,Validators.required],
    })

    this.category=this.form.controls["category"];

    this.firstName=this.form.controls["firstName"];
    this.lastName=this.form.controls["lastName"];
    this.enName=this.form.controls["enName"];
    this.subName=this.form.controls["subName"];
    this.nation=this.form.controls["nation"];
    this.nationality=this.form.controls["nationality"];
    this.monkCertificateNumber=this.form.controls["monkCertificateNumber"];
    this.birthOfDate=this.form.controls["birthOfDate"];

    this.village=this.form.controls["village"];
    this.commune=this.form.controls["commune"];
    this.district=this.form.controls["district"];
    this.province=this.form.controls["province"];

    this.bMvillage=this.form.controls["bMvillage"];
    this.bMcommune=this.form.controls["bMcommune"];
    this.bMdistrict=this.form.controls["bMdistrict"];
    this.bMprovince=this.form.controls["bMprovince"];
    this.beMonkDate=this.form.controls["beMonkDate"];

    this.localCertificateNumber=this.form.controls["localCertificateNumber"];
    this.localCertificateDate=this.form.controls["localCertificateDate"];
    this.localCertificateChief=this.form.controls["localCertificateChief"];
    this.localCertificateDistrict=this.form.controls["localCertificateDistrict"];
    this.localCertificateProvince=this.form.controls["localCertificateProvince"];
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
  Edit(f:any){
    if(this.form.valid){
      this.dialogRef.close(f);  
    }
  }

  
  onUpdate(f: any){
    if(this.form.valid){
      const item: IProduct = {
        key: this.data.key,
        firstName:f.firstName,lastName:f.lastName,
        enName:f.enName,subName:f.subName,nation:f.nation, nationality:f.nationality,
        monkCertificateNumber:f.monkCertificateNumber,birthOfDate:f.birthOfDate,
        birthOfPlace:f.birthOfPlace,beMonkDate:f.beMonkDate,bMvillage:f.bMvillage,bMcommune:f.bMcommune,bMdistrict:f.bMdistrict,bMprovince:f.bMprovince,village:f.village,commune:f.commune,
        district:f.district,province:f.province,localCertificateNumber:f.localCertificateNumber,localCertificateDate:f.localCertificateDate,
        localCertificateChief:f.localCertificateChief,localCertificateDistrict:f.localCertificateDistrict,localCertificateProvince:f.localCertificateProvince,category:f.category,
        updateDate: new Date(),
        updateBy: this.auth.getUser()
      }
      this.store.update(item, (success,error)=>{
        if(success){
          this.dialogRef.close()
          this.SnackBar.open("Update succesfully.","Trust me", {duration: 2000})
        }else{
          this.SnackBar.open(error, "Error");
        }
      })
    }

  }
} 