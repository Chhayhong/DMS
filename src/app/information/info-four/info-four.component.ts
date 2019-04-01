import { Component, OnInit } from '@angular/core';
import { DeleteComponent } from 'src/app/dialog/delete/delete.component';
import { AddProductComponent } from 'src/app/dialog/add-product/add-product.component';
import { UploadCoverComponent } from 'src/app/dialog/upload-cover/upload-cover.component';
import { ProductEditComponent } from 'src/app/dialog/product-edit/product-edit.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Product } from 'src/app/store/product.store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/store/category.store';

@Component({
  selector: 'app-info-four',
  templateUrl: './info-four.component.html',
  styleUrls: ['./info-four.component.scss']
})
export class InfoFourComponent implements OnInit {
  displayedColumns= ['profile','lastName','firstName',"wat","district","district2",
  "province","action"];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(public store:Product,public category:Category, _formBuilder: FormBuilder,
    private dialog:MatDialog,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit() {
    this.store.fetchData()
    this.category.fetchData()
  }

  update(product){
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '550px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='yes'){
        // this.product.update(product,(success,error)=>{
        //   if(success){
        //     this.snackBar.open("Product has been deleted successfully.", "Done",{duration: 2000,})
        //   } else {
        //     this.snackBar.open(error, "Error");
        //   }
        // })
      }
    }); 
  } 
  delete(item){
    const dialogRef=this.dialog.open(DeleteComponent, {
      width: '350px',
      data: {title: "Delete Category", subtitle: "Are you sure?"} 
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==='yes'){
        this.store.delete(item,(success,error)=>{
          if(success){
            this.snackBar.open("Item has been deleted ", "Done", {
              duration: 2000,
            });
          }
          else{
            this.snackBar.open(error,"error" , {
              duration: 2000,
            });
          }
        })
      }
    });
  }
  create(){
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '810vw',
      data:null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onUpdateCover(item){
    const dialogRef = this.dialog.open(UploadCoverComponent, {
      width: '810vw',
      data:item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
