import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/store/house.store';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteComponent } from 'src/app/dialog/delete/delete.component';
import { HouseEditComponent } from 'src/app/dialog/house-edit/house-edit.component';
import { HouseAddComponent } from 'src/app/dialog/house-add/house-add.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {
  displayedColumns= ['homeName','homeLeader','homeBuildDate','homeFloors',"category","updateBy","updateDate","action"];
  constructor(public store:Home,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,) { }


  ngOnInit() {
    this.store.fetchData();
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
  // Edit(item:any){
  //   const dialogRef=this.dialog.open(HouseEditComponent,{
  //     data:item,
  //     width: '100vh'
  //   });
  // dialogRef.afterClosed().subscribe(result=>{
  //   if(result!=='no'){
  //     this.store.update(item.key,result,error=>{
  //       this.snackBar.open('Item has been updated successfully',"Done",{
  //         duration:2000
  //       })
  //     })
  //   } 
  // })
  // }
  update(product){
    const dialogRef = this.dialog.open(HouseEditComponent, {
      width: '450px',
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
  create(){
    const dialogRef = this.dialog.open(HouseAddComponent, {
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    }

}
