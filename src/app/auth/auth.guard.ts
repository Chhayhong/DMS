import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth:AngularFireAuth,
    public router:Router,
  ){}
  canActivate(route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean>{
  return this.afAuth.authState.take(1).map(user=>!!user).do(async loggedIn=>{
    if(loggedIn){
      return true;
    }
    this.router.navigate(['/login'],{queryParams:{returnUrl:state.url} });
    return false;
  })
}

}

