import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(private auth:AngularFireAuth, private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {    //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
 }
  canActive(){
    const {currentUser}=this.auth.auth
      if(currentUser){
        return true;
      }
      return false;
  }


  //social login with popup
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.router.navigate(['/apps'])
        this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error));
  }
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  facebooklogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/homepage']);
    });
  }
  signInWithEmail(email,password){
    return this.auth.auth.signInWithEmailAndPassword(email,password);
    
  }
  
  onCanActive(){
    this.auth.auth.onAuthStateChanged(user=>{
      if(user){

      }
    })
  }
  getUser(){
    const {currentUser}=this.auth.auth;
    if(currentUser){
      const {uid,email,displayName,photoURL}=currentUser;
    
    return{
      uid,email,displayName,photoURL
    }
  }
  return null;
}

  //signup a new user(by email/password ) to our firebase  
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        console.log('Signup successfully!');
        this.router.navigate(['/login']);
        return this.updateUserData(credential.user); 
      })
      .catch(error => this.handleError(error));
  }
  private updateUserData(user) {
    const userRef = this.afs.collection('users').doc(user.uid);
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
      return userRef.set(data, { merge: true });
  }
  private handleError(error: Error) {
    console.error(error);
      alert(error.message);
  }
}
