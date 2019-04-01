import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { IPhnomPenh } from '../interfaces/phnompenh';

@Injectable()
export class PhnomPenh {
  @observable 
  public data=[];
  public empty=false;
  public loading=false;
  @observable 
  public process=false;
  constructor(private ds:DataService){
  }
  @action
  fetchPhnomPenh(callback){
    this.ds.phnompenhRef().valueChanges().subscribe(list=>{
        callback(list)
    })
  }
  @action
  updateCover(product,fileUrl,callback){
    this.ds.phnompenhRef().doc(product.key).update({
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
    this.ds.phnompenhRef().valueChanges().subscribe(docs=>{
      this.data=docs;
      this.empty=docs.length===0;
      this.loading=false;
    })
  }
@action
delete(item,callback){
  this.process=true;
  this.ds.phnompenhRef().doc(item.key).delete().
  then(()=>{
    this.process=false;
    callback(true,null)
  }).catch((error)=>{
    this.process=false;
    callback(false,error)
  })
}
@action
add(item: IPhnomPenh){
     return this.ds.phnompenhRef().doc(item.key).set(item)
}
@action
update(item,callback){
  this.process=true;
  this.ds.phnompenhRef().doc(item.key).update(item)
  .then(()=>{
    this.process=false;
    callback(true,null);
  }).catch(error=>{
    this.process=false;
    callback(false,error)
  })
}

@action
save(item: IPhnomPenh){
     return this.ds.phnompenhRef().doc(item.key).set(item)
}
}