import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getAuth, getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import * as firebase from 'firebase/compat';
import { User } from '../shared/user.interface';
import { FacebookAuthProvider } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore
    ) { }

  
  async loginFireAuth(value): Promise<User> {
    try {
      const { user } = await this.auth.signInWithEmailAndPassword(value.email, value.password);
      this.updateUserData(user);
      return user;
      } catch (error) {
      console.log('Error->', error);
    }
  }
  
  async onLoginGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      auth.languageCode = 'es';
      const { user } = await this.auth.signInWithPopup(provider);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }
  async onLoginFacebook(): Promise<User> {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      auth.languageCode = 'es';
      const { user } = await this.auth.signInWithPopup(provider);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }
  async resetPassword(email: string): Promise<void> {
    try {
      return this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }
  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }
}
