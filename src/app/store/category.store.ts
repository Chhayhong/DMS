import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import {ICategory} from '../interfaces/category';
@Injectable()
export class Category {
  @observable 
  public data=[];
  public empty=false;
  public loading=false;
  @observable 
  public process=false;
  constructor(private ds:DataService){
  }
  @action
  add(item:ICategory){
  return  this.ds.categoryRef().doc(item.key).set(item);
  }
  @action
  fetchCatgory(callback){
    this.ds.categoryRef().valueChanges().subscribe(list=>{
        callback(list)
    })
  }
  @action
  fetchData(){
    this.loading=true;
    this.ds.categoryRef().valueChanges().subscribe(docs=>{
      this.data=docs;
      this.empty=docs.length===0;
      this.loading=false;
    })
  }
  // @action
  // update(key,item,callback){
  //     this.ds.categoryRef().doc(key).update(item).then(()=>{
  //         callback(item)
  //     }).catch(error=>{
  //         callback(error)
  //     })
  // }
  
@action
update(item,callback){
  this.process=true;
  this.ds.categoryRef().doc(item.key).update(item)
  .then(()=>{
    this.process=false;
    callback(true,null);
  }).catch(error=>{
    this.process=false;
    callback(false,error)
  })
}
  @action
  delete(item,callback){
    this.process=true;
    this.ds.categoryRef().doc(item.key).delete().
    then(()=>{
      this.process=false;
      callback(true,null)
    }).catch((error)=>{
      this.process=false;
      callback(false,error)
    })
  }
}