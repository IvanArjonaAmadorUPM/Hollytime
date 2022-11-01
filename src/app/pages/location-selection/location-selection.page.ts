import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.page.html',
  styleUrls: ['./location-selection.page.scss'],
})
export class LocationSelectionPage implements OnInit {


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

  ) { }
  
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.userSelection = params["time"];
      ;
  });
  }

  chooseLocation(){
    this.currentPostionSelected = false
    this.choosePositionSelected = true
    if(this.printCurrentPosition){
      this.stopTracking()
    }
  }
  chooseActualLocation(){
    this.currentPostionSelected = true
    this.choosePositionSelected = false

    Geolocation.checkPermissions()
    Geolocation.requestPermissions()
    this.loadingCoords = true;
 
    this.printCurrentPosition = Geolocation.watchPosition({},(position,err)=>{
      //console.log('new position' , position)
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
      ; }, 1500);

  }
  stopTracking(){
    Geolocation.clearWatch({id: this.printCurrentPosition})
  }
  geolocationSelectionComplete() {
    //console.log("continuar")
    }
  checkContinue() {
    return !(this.userCoordinates &&this.userCoordinates.lat &&this.userCoordinates.long )
    }
}
