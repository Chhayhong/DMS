// import { Component, OnInit, Inject } from '@angular/core';
// import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
// import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { Product } from 'src/app/store/product.store';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { AuthService } from 'src/app/auth/auth.service';
// import { Observable } from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

// @Component({
//   selector: 'app-monk-name',
//   templateUrl: './monk-name.component.html',
//   styleUrls: ['./monk-name.component.scss']
// })
// export class MonkNameComponent implements OnInit {
//   form:FormGroup;
//   firstName:AbstractControl;
//   lastName:AbstractControl;
//   subname:AbstractControl;
//   category:AbstractControl;
//   age:AbstractControl;
//   monkAge:AbstractControl;
//   process:boolean;
//   filteredStates: Observable<any[]>;
//   states:Array<any>
//   constructor(private snackBar:MatSnackBar,
//     public dialogRef: MatDialogRef<MonkNameComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb:FormBuilder,
//     public store: Product,
//     private db:AngularFirestore,
//     private auth:AuthService
//     ) { }

//   ngOnInit() {
//     this.form=this.fb.group({
//       firstName:[null,Validators.required],
//       lastName:[null,Validators.required],
//       subname:[null,Validators.required],
//       category:[null,Validators.required],
//       age:[null,Validators.required],
//       monkAge:[null,Validators.required]
//     })
//     this.firstName=this.form.controls["firstName"];
//     this.lastName=this.form.controls["lastName"];
//     this.subname=this.form.controls["subname"];
//     this.category=this.form.controls["category"];
//     this.age=this.form.controls["age"];
//     this.monkAge=this.form.controls["monkAge"];
//     this.store.fetchCatgory(list=>{
// this.states=list;

// this.filteredStates = this.category.valueChanges
// .pipe(
//   startWith(''),
//   map(state => state ? this._filterStates(state) : this.states.slice())
// );
//     })
//   }

//   private _filterStates(value: any): any[] {
//     const filterValue =value?value.key?value.wat:value.toLowerCase():null; 

//     return this.states.filter(state => 
//       state.wat &&  state.wat.toLowerCase().indexOf(filterValue) === 0);
//   }
//   displayFn(user?: any): string | undefined {
//     return user ? user.wat : undefined;
//   }
//   _onSave(f){
//     if(this.form.valid){
//       this.form.disable();
//       const {firstName,lastName,subname,category,age,monkAge}=f;
//       const item:any={
//         key:this.db.createId(),
//         createBy:this.auth.getUser(),
//         createDate:new Date(),
//         firstName:firstName,
//         lastName:lastName,
//         subname:subname,
//         age:age,
//         monkAge:monkAge,
//         category:category
//       }
//       this.store.save(item).then(()=>{
//         this.form.enable();
//         this.form.reset();
//         this.snackBar.open('ប្រវត្តិរូប has been save successfully',"Done",{
//           duration:2000
//         })
//         }).catch(error=>{
//           alert(error);
//           this.form.enable();
//         this.form.reset();
//         }) 
//       }
//     }
  
// }

import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Product } from "src/app/store/product.store";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/auth/auth.service";
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AddProductComponent } from 'src/app/dialog/add-product/add-product.component';
@Component({
  selector: 'app-monk-name',
  templateUrl: './monk-name.component.html',
  styleUrls: ['./monk-name.component.scss']
})
export class MonkNameComponent implements OnInit {
form: FormGroup;
name: AbstractControl;
price: AbstractControl;
category: AbstractControl;

filteredStates: Observable<any[]>;
states:Array<any>;

constructor(
  public dialogRef: MatDialogRef<AddProductComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  public store: Product,
  private db: AngularFirestore,
  private auth: AuthService
) {}

ngOnInit() {
  this.form = this.fb.group({
    name: [null, Validators.required],
    category: [null, Validators.required],
    price: [null, Validators.required]
  });
  this.name = this.form.controls["name"];
  this.category = this.form.controls["category"];
  this.price = this.form.controls["price"];

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
  return this.states.filter(state => state.wat && state.wat.toLowerCase().indexOf(filterValue) === 0);
}

displayFn(user?: any): string | undefined {
  return user ? user.wat : undefined;
}

_onSave(f){
  if(this.form.valid){
    this.form.disable();
    const {name,price,category}=f;
    const item:any={
      key:this.db.createId(),
      createBy:this.auth.getUser(),
      createDate:new Date(),
      name:name,
      price:price,
      category:category
    }
    this.store.save(item).then(()=>{
      this.form.enable();
      this.form.reset();
    }).catch(error=>{
      alert(error);
      this.form.enable();
    })
  }
}


}
