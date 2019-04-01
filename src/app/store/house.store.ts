import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';

@Injectable()
export class Home {
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
  fetchData(){
    this.loading=true;
    this.ds.homeRef().valueChanges().subscribe(docs=>{
      this.data=docs;
      this.empty=docs.length===0;
      this.loading=false;
    })
  }
@action
delete(item,callback){
  this.process=true;
  this.ds.homeRef().doc(item.key).delete().
  then(()=>{
    this.process=false;
    callback(true,null)
  }).catch((error)=>{
    this.process=false;
    callback(false,error)
  })
}
@action
update(item,callback){
  this.process=true;
  this.ds.homeRef().doc(item.key).update(item)
  .then(()=>{
    this.process=false;
    callback(true,null);
  }).catch(error=>{
    this.process=false;
    callback(false,error)
  })
}
@action
save(homes){
  return  this.ds.homeRef().doc(homes.key).set(homes);
}
}