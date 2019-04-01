import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddCategoryComponent } from 'src/app/dialog/add-category/add-category.component';
import { Category } from 'src/app/store/category.store';
import { DeleteComponent } from 'src/app/dialog/delete/delete.component';
import { EditComponent } from 'src/app/dialog/edit/edit.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  displayedColumns= ['wat','village','commune','district','province','email',"action"];

  constructor(private dialog:MatDialog,
    private snackBar:MatSnackBar,
    public store:Category) { }

  ngOnInit() {
    this.store.fetchData();
  }
  create(){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    }
    
    // Edit(item:any){
    //   const dialogRef=this.dialog.open(EditComponent,{
    //     data:item,
    //     width: '100vh'
    //   });
    // dialogRef.afterClosed().subscribe(result=>{
    //   if(result!=='no'){
    //     this.store.update(item.key,result,error=>{
    //       this.snackBar.open('Category has been updated successfully',"Done",{
    //         duration:2000
    //       })
    //     })
    //   } 
    // })
    // }
    update(category){
      const dialogRef = this.dialog.open(EditComponent, {
        width: '650px',
        data: category
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
            this.snackBar.open("Category has been deleted ", "Done", {
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
}