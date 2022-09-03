import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword ,signInWithRedirect} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  registerFireWithEmail(value){
    return new Promise((resolve, reject)=>{
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, value.email, value.password)
     .then(
      res => resolve(res),
      error => reject(error)
      ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      });
    })
  }

  registerFireGoogle(){
  //   return new Promise((resolve, reject)=>{
  //     const provider = new GoogleAuthProvider();
  //     const auth = getAuth();
  //     auth.languageCode = 'es';
  //     signInWithRedirect(auth, provider).then((result) => {
  //     res => resolve(res)
  //     error => reject(error)
      
  //   }).catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     const email = error.customData.email;
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     console.log(errorCode, errorMessage)
  //   });
  // })
  } 
}