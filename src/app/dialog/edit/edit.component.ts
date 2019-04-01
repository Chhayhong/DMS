import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/store/category.store';
import { startWith, map } from 'rxjs/operators';
import { uCategory } from 'src/app/interfaces/category.update';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form:FormGroup;
  wat:AbstractControl;
  village:AbstractControl;
  category:AbstractControl;
  district:AbstractControl;
  district2:AbstractControl;
  province:AbstractControl;
  process:boolean;
  filteredStates: Observable<any[]>;
  states:Array<any>
  constructor(   public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Category,
    private fb:FormBuilder,
    private auth: AuthService,
    private SnackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.form=this.fb.group({
      district:[this.data.district,Validators.required],
      village:[this.data.village,Validators.required],
      district2:[this.data.district2,Validators.required],
      province:[this.data.province,Validators.required],
      category:[this.data.category,Validators.nullValidator],
      wat:[this.data.wat,Validators.required],
    })
    this.wat=this.form.controls["wat"];
    this.village=this.form.controls["village"];
    this.district=this.form.controls["district"];
    this.district2=this.form.controls["district2"];
    this.province=this.form.controls["province"];
    this.category=this.form.controls["category"];
    
  }
  
  onUpdate(f: any){
    if(this.form.valid){
      const item: uCategory = {
        key: this.data.key,
        wat: f.wat,
        village:f.village,
        district:f.district,
        district2:f.district2,
        province:f.province,
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