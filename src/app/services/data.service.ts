import { Injectable } from '@angular/core';
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from 'src/environments/environment'
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth.service';
import { delay, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);
  constructor(
    private authService: AuthService,
  ) { }

  async getEvents(){
    const eventosCol = collection(this.db, 'eventos');
    const eventosSnapshot = await getDocs(eventosCol);
    const eventosList = eventosSnapshot.docs.map(doc => doc.data());
    return eventosList
  }

  async getRoutes() {
    await this.getUser()
    let url = '/userData/' + this.user['email'] + '/routes'
    var docRef = collection(this.db, url)
    const routesSnapshot = await getDocs(docRef);
    const routesList = routesSnapshot.docs.map(doc => doc.data());
    return routesList
  }

  async getUser() {
    this.user = await this.authService.getCurrentUser().then(
    );
  }

}
