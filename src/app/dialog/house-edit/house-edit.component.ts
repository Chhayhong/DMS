import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Home } from 'src/app/store/house.store';
import { startWith, map } from 'rxjs/operators';
import { updateHome } from 'src/app/interfaces/home.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss']
})
export class HouseEditComponent implements OnInit {
  form:FormGroup;
  homeName:AbstractControl;
  homeLeader:AbstractControl;
  category:AbstractControl;
  homeBuildDate:AbstractControl;
  homeFloors:AbstractControl;
  process:boolean;
  filteredStates: Observable<any[]>;
  states:Array<any>
  constructor(   public dialogRef: MatDialogRef<HouseEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Home,
    private fb:FormBuilder,private auth: AuthService,    private SnackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.form=this.fb.group({
      homeName:[this.data.homeName,Validators.required],
      homeLeader:[this.data.homeLeader,Validators.required],
      homeBuildDate:[this.data.homeBuildDate,Validators.required],
      homeFloors:[this.data.homeFloors,Validators.required],
      category:[this.data.category,Validators.required],
    })
    this.homeName=this.form.controls["homeName"];
    this.homeLeader=this.form.controls["homeLeader"];
    this.category=this.form.controls["category"];
    this.homeBuildDate=this.form.controls["homeBuildDate"];
    this.homeFloors=this.form.controls["homeFloors"];
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
      const item: updateHome = {
        key: this.data.key,
        homeName:f.homeName,homeLeader:f.homeLeader,homeBuildDate:f.homeBuildDate,homeFloors:f.homeFloors,category:f.category,
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