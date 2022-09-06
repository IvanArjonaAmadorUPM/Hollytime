import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HomePage } from '../home/home.page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { turistPlace } from '../../shared/turistPlace.interface'
import data from '../../data/PIT.json'
import { PitInfoPage } from '../pit-info/pit-info.page';
import { MarkerClickCallbackData } from '@capacitor/google-maps/dist/typings/definitions';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;
  turistPlaceData: turistPlace[]
  markers: Marker[] = []

  constructor(
    private modalCtrl : ModalController,
    private http: HttpClient, ) { }

  ionViewDidEnter(){
    this.createMap();
  }
  ngOnInit() {
    this.getMarkersData();
    this.createMarkers();
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
    })

    this.addMarkers();
    this.map.setOnMarkerClickListener
  }
  
  async addMarkers(){
    await this.map.addMarkers(this.markers);

    this.map.setOnMarkerClickListener(async(marker) => {
      const turistPointInfo = getInfoFromMarker(marker)
      const modal = await this.modalCtrl.create({
        component: PitInfoPage, // abre un componente en un modal
        componentProps:{
          turistPointInfo,
        },
        
        breakpoints: [0, 1],
        initialBreakpoint: 0.9,
      });
      modal.present();
    })
  }
  
  getMarkersData(){
    this.turistPlaceData = data    
  }
  createMarkers() {
    this.turistPlaceData.map( turistPlace =>{
      console.log(turistPlace)
      let marker: Marker = {
        coordinate:{
          lat: turistPlace.latitud	,
          lng: turistPlace.longitud ,
        },
        title: turistPlace.Nombre,        
      }
      this.markers.push(marker);
    })
  }
}
function getInfoFromMarker(marker: MarkerClickCallbackData) {
  let result;
  data.map(pit =>{
    if(pit.Nombre === marker.title){
      console.log(pit.Nombre)
      result = pit
    }}
  )
  return result
}

