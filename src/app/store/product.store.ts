import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { IProduct } from '../interfaces/product';

@Injectable()
export class Product {
  @observable 
  public data=[];
  public empty=false;
  public loading=false;
  @observable 
  public process=false;
  constructor(private ds:DataService){
  }
  @action
  fetchCatgory(callback){
    this.ds.categoryRef().valueChanges().subscribe(list=>{
        callback(list)
    })
  }
  @action
  updateCover(product,fileUrl,callback){
    this.ds.productRef().doc(product.key).update({
      fileUrl:fileUrl
    }).then(()=>{
      callback(true)
    }).catch(error=>{
      callback(false)
    })
  }

  @action
  fetchData(){
    this.loading=true;
    this.ds.productRef().valueChanges().subscribe(docs=>{
      this.data=docs;
      this.empty=docs.length===0;
      this.loading=false;
    })
  }
@action
delete(item,callback){
  this.process=true;
  this.ds.productRef().doc(item.key).delete().
  then(()=>{
    this.process=false;
    callback(true,null)
  }).catch((error)=>{
    this.process=false;
    callback(false,error)
  })
}
// @action
// update(key,item,callback){
//     this.ds.productRef().doc(key).update(item).then(()=>{
//         callback(item)
//     }).catch(error=>{
//         callback(error)
//     })
// }
@action
add(item: IProduct){
     return this.ds.productRef().doc(item.key).set(item)
}
@action
update(item,callback){
  this.process=true;
  this.ds.productRef().doc(item.key).update(item)
  .then(()=>{
    this.process=false;
    callback(true,null);
  }).catch(error=>{
    this.process=false;
    callback(false,error)
  })
}
// @action
// save(product){
//   return  this.ds.productRef().doc(product.key).set(product);
// }

@action
save(item: IProduct){
     return this.ds.productRef().doc(item.key).set(item)
}
}