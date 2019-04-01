import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Home } from 'src/app/store/house.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-house-add',
  templateUrl: './house-add.component.html',
  styleUrls: ['./house-add.component.scss']
})
export class HouseAddComponent implements OnInit {
  form:FormGroup;
  homeName:AbstractControl;
  homeLeader:AbstractControl;
  category:AbstractControl;
  homeBuildDate:AbstractControl;
  homeFloors:AbstractControl;
  wat:AbstractControl;
  process:boolean;
  filteredStates: Observable<any[]>;
  states:Array<any>
  constructor(private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<HouseAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    public store: Home,
    private db:AngularFirestore,
    private auth:AuthService
    ) { }

  ngOnInit() {
    this.form=this.fb.group({
      homeName:[null,Validators.required],
      homeLeader:[null,Validators.required],
      category:[null,Validators.required],
      homeBuildDate:[null,Validators.required],
      homeFloors:[null,Validators.required],
      wat:[null,Validators.nullValidator],
    })
    this.homeName=this.form.controls["homeName"];
    this.homeLeader=this.form.controls["homeLeader"];
    this.category=this.form.controls["category"];
    this.homeBuildDate=this.form.controls["homeBuildDate"];
    this.homeFloors=this.form.controls["homeFloors"];
    this.wat=this.form.controls["wat"];
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
  _onSave(f){
    if(this.form.valid){
      this.form.disable();
      const {wat:wat,homeName,homeLeader,category,homeFloors,homeBuildDate}=f;
      const item:any={
        key:this.db.createId(),
        createBy:this.auth.getUser(),
        createDate:new Date(),
        homeLeader:homeLeader,
        homeName:homeName,
        homeBuildDate:homeBuildDate,
        homeFloors:homeFloors,
        category:category,
        wat:wat

      }
      this.store.save(item).then(()=>{
        this.form.enable();
        this.form.reset();
        this.snackBar.open('កុដិ has been save successfully',"Done",{
          duration:2000
        })
        }).catch(error=>{
          alert(error);
          this.form.enable();
        this.form.reset();
        }) 
      }
    }
  
}