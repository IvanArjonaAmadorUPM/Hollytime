import { Injectable } from '@angular/core';
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from 'src/environments/environment'
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);
  constructor() { }

  async getEvents(){
    const eventosCol = collection(this.db, 'eventos');
    const eventosSnapshot = await getDocs(eventosCol);
    const eventosList = eventosSnapshot.docs.map(doc => doc.data());
    return eventosList
  }
}
