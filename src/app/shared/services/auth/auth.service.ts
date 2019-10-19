import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )
  }

  async googleAuthSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const { user } = await this.fireAuth.auth.signInWithPopup(provider);
      this.updateUserData(user);
      return this.router.navigate(['/']);
    } catch(error) {
      console.error(error.message);
    }
  }

  async userSignupWithCredentials(credentials) {
    try {
      const { email, password, photoURL, displayName } = credentials;
      const { user: { uid } } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userDetails = { uid, photoURL, displayName, email };
      await this.updateUserData(userDetails);
      return this.router.navigate(['/']);
    } catch(error) {
      console.error(error.message);
    }
  }

  async userLoginWithCredentials(email:string, password:string) {
    try {
      console.log
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return this.router.navigate(['/']);
    } catch(error) {
      console.error(error);
    }
  }

  async userSignOut() {
    try {
      await this.fireAuth.auth.signOut();
      return this.router.navigate(['/']);
    } catch(error) {
      console.error(error.message);
    }
  }

  updateUserData({ uid, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument = this.fireStore.doc(`users/${uid}`);
    const data = { uid, displayName, photoURL, favoriteMovies: [] };
    return userRef.set(data, { merge: true });
  }
}
