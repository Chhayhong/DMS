import { AuthService } from './../../auth/auth.service';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/interfaces/category';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PhnomPenh } from 'src/app/store/phnompenh.store';
import { startWith, map } from 'rxjs/operators';
import { Category } from 'src/app/store/category.store';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form:FormGroup;
  wat:AbstractControl;
  village:AbstractControl;
  district:AbstractControl;
  commune:AbstractControl;
  province:AbstractControl;
  filteredStates: Observable<any[]>;
  states:Array<any>
  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    public store:PhnomPenh,
    public category:Category,    private db:AngularFirestore,
    private auth:AuthService
    ) { }

  ngOnInit() {
    this.form=this.fb.group({
      wat:[null,Validators.required],
      village:[null,Validators.required],
      district:[null,Validators.required],
      commune:[null,Validators.required],
      province:[null,Validators.required]
  })
  this.wat=this.form.controls["wat"];
  this.village=this.form.controls["village"];
  this.district=this.form.controls["district"];
  this.commune=this.form.controls["commune"];
  this.province=this.form.controls["province"];
  this.store.fetchPhnomPenh(list=>{
    this.states=list;
    
    this.filteredStates = this.village.valueChanges
    this.filteredStates = this.district.valueChanges
    this.filteredStates = this.commune.valueChanges
    this.filteredStates = this.province.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
        })
      }
    
      private _filterStates(value: any): any[] {
        const filterValue =value?value.key?value.pvillage:value.toLowerCase():null;     
        return this.states.filter(state => 
          state.pvillage &&  state.pvillage.toLowerCase().indexOf(filterValue) === 0);      }
      displayFn(user?: any): string | undefined {
        return user ? user.pvillage : undefined;
      }
  
  _onSave(f:any){
    if(this.form.valid){
      this.form.disable();
      const {wat,village,commune,district,province}=f;
      const item:ICategory={
        key:this.db.createId(),
        createBy:this.auth.getUser(),
        createDate:new Date(),
        wat:wat,
        village : village,
        district : district,
        commune:commune,
        province : province 

      }
      this.category.add(item).then(()=>{
        this.form.enable();
        this.form.reset();
      }).catch(error=>{
        alert(error);
        this.form.enable();
      })
    }
  }

}
