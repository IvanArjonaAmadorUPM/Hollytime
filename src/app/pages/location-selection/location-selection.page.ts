import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { MapPositionSelectorPage } from '../map-position-selector/map-position-selector.page';
import { ActionSheetController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.page.html',
  styleUrls: ['./location-selection.page.scss'],
})
export class LocationSelectionPage implements OnInit {

  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;
  
  userSelection 

  currentPostionSelected = false
  choosePositionSelected = false

  userCoordinates={
    "lat": null,
    "long":null,
  }
    printCurrentPosition

    loadingCoords = false;
  constructor(
    private router: ActivatedRoute,
    private modalCtrl : ModalController,
    private routerLink: Router,

  ) { }

  ionViewDidEnter(){
    this.createMap();
  }
  
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.userSelection = params["time"];
      ;
  });
  }
  async createMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config:{
        center: {
          lat: 40.48205,
          lng: -3.36996
        },
        zoom: 14,
      },
    })}

  async chooseLocation(){
    this.currentPostionSelected = false
    this.choosePositionSelected = true
    if(this.printCurrentPosition){
      this.stopTracking()
    }
    const modal = await this.modalCtrl.create({
      component: MapPositionSelectorPage, // abre un componente en un modal
      cssClass: 'cal-modal',
      backdropDismiss: true
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if(role ==="confirm"){
      this.setChoosenCoords(data)
    }

  }
  setChoosenCoords(data: any) {
    this.userCoordinates=data
  }

  async chooseActualLocation(){
    this.currentPostionSelected = true
    this.choosePositionSelected = false

    Geolocation.checkPermissions()
    Geolocation.requestPermissions()
    this.loadingCoords = true;

    let location = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
  });
  if (location && location.coords){
    this.addLocation(location.coords.latitude , location.coords.longitude)

  }
    this.printCurrentPosition = await Geolocation.watchPosition({},(position,err)=>{
      if(position && position.coords){
        this.addLocation(position.coords.latitude , position.coords.longitude)
      }
    })
  }
  addLocation(latitude: number, longitude: number) {
    this.userCoordinates={
      "lat":latitude,
      "long":longitude,
    }
    setTimeout(() => {
      this.loadingCoords = false;
      ; }, 1000);

  }
  stopTracking(){
    Geolocation.clearWatch({id: this.printCurrentPosition})
  }
  geolocationSelectionComplete() {
    this.stopTracking();
    this.userSelection = JSON.parse(this.userSelection)
    this.userSelection = Object.assign(this.userSelection, this.userCoordinates)
    let dataToPass: any = {
      queryParams: {
        time: JSON.stringify(this.userSelection)
      }
    };
    this.routerLink.navigate(['/preferences-selector'], dataToPass);

    }
  checkContinue() {
    return !(this.userCoordinates &&this.userCoordinates.lat &&this.userCoordinates.long )
    }
}
