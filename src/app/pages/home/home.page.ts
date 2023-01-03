import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user$ = this.auth.user;

  constructor(
    private authService: AuthService,
    private readonly auth: AngularFireAuth,
    private router: Router,
  ) { }

  async ngOnInit() {
    const us = await this.authService.getCurrentUser().then()
  }

  onMapClick(){
    this.router.navigate(['/map'])
  }
  onEventsClick(){
    this.router.navigate(['/events'])
  }
  onWeatherClick(){
    this.router.navigate(['/weather'])
  }
  onNewRouteClick(){
    this.router.navigate(['/time-selector'])
  }
  onRoutesClick(){
    this.router.navigate(['/routes'])
  }
  getBackGroundColor(name){
    if(name=="eventos")
      return '#3e76de'
    if(name=="misrutas")
      return '#3dd456'
    if(name=="mapa")
      return '#3cab96'
    if(name=="ruta")
      return '#c7ba44'
    if(name=="tiempo")
      return "#de4d43"
  }
}
