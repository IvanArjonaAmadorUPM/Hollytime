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
import { Router } from  "@angular/router";

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
  markersId: string[]=[]
  museumMarker: Marker[] =[]
  museumMarkerIds: string[] = []

  churchMarker: Marker[] =[]
  churchMarkerIds: string[] = []

  arqueologicalMarker: Marker[] =[]
  arqueologicalMarkerIds: string[] = []

  towerMarker: Marker[] =[]
  towerMarkerIds: string[] = []

  monumentMarker: Marker[] =[]
  monumentMarkerIds: string[] = []

  markersByType: any[] = []

  museos=true;
  arqueologia=true;
  iglesias=true;
  torres=true;
  monumentos=true;

  constructor(
    private modalCtrl : ModalController,
    private http: HttpClient,
    private router: Router,
    ) { }

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
    this.addMarkersByType(this.museumMarker)
    this.addMarkersByType(this.churchMarker)
    this.addMarkersByType(this.towerMarker)
    this.addMarkersByType(this.arqueologicalMarker)
    this.addMarkersByType(this.monumentMarker)
    this.initMarkerModal()
  }
  
  async addMarkersByType(markesByTypes){
    let markersId = await this.map.addMarkers(markesByTypes);
    let aux = [markesByTypes,markersId]
    this.markersByType.push(aux)


  }
  onBackClicked(){
    this.router.navigate(['/home'])
  }

  onToggleChange(event,itemSelected){
    if(event.detail.checked){
      if(itemSelected == 'judio'||'cristiano'||'musulman'){
        this.mostrarBarrio(itemSelected)
      }
      this.createNewMarkers(itemSelected)
    }else      
    this.eliminateMarkers(itemSelected)
  }
  createNewMarkers(itemSelected: any) {
    if(itemSelected=="museos"){
      this.addMarkersByType(this.museumMarker)
    }
    if(itemSelected=="iglesias"){
      this.addMarkersByType(this.churchMarker)
    }
    if(itemSelected=="torres"){
      this.addMarkersByType(this.towerMarker)
    }
    if(itemSelected=="arqueologia"){
      this.addMarkersByType(this.arqueologicalMarker)

    }
    if(itemSelected=="monumentos"){
      this.addMarkersByType(this.monumentMarker)
    }
  }
  getMarkersData(){
    this.turistPlaceData = data    
  }
  createMarkers() {
    this.turistPlaceData.map( turistPlace =>{
      let iconUrl = this.getIconUrl(turistPlace.tipo);

      let marker: Marker = {
        coordinate:{
          lat: turistPlace.latitud	,
          lng: turistPlace.longitud ,
        },
        title: turistPlace.Nombre,    
        iconUrl: iconUrl,      
      }
      this.markers.push(marker);
      if(turistPlace.tipo =="Museum"){
        this.museumMarker.push(marker)
      }
      if(turistPlace.tipo =="Church"){
        this.churchMarker.push(marker)
      }
      if(turistPlace.tipo =="Arqueological"){
        this.arqueologicalMarker.push(marker)
      }
      if(turistPlace.tipo =="Tower"){
        this.towerMarker.push(marker)
      }
      if(turistPlace.tipo =="Monument"){
        this.monumentMarker.push(marker)
      }
    })
  }
  
 mostrarBarrio(historicNeighbourhood: string) {
  //todo
}
async eliminateMarkers(itemSelected: any) {
  let aux:[] =[];
  let indexToDelete
  let itemUrl = this.getUrlFromItem(itemSelected)
  this.markersByType.map((type, index)=>{
    aux = type[0];
    aux.map( pit => {
      if(pit['iconUrl'] == itemUrl ){
        indexToDelete = index
      }
    })
  })
  let arrayToDelete = this.markersByType[indexToDelete];
  await this.map.removeMarkers(arrayToDelete[1])
  this.markersByType.splice(indexToDelete,1)
}


getUrlFromItem(itemSelected: any) {
  if(itemSelected == "museos"){
    return "/assets/icon/museum48.png"
  }
  if(itemSelected == "arqueologia"){
    return "/assets/icon/arqueological.png"
  }
  if(itemSelected == "torres"){
    return "/assets/icon/tower.png"
  }
  if(itemSelected == "iglesias"){
    return "/assets/icon/iglesia.png"
  } 
  if(itemSelected == "monumentos"){
    return "/assets/icon/monument.png"
  } 
  
}
getIconUrl(type){
  if(type =="Museum"){
    return "/assets/icon/museum48.png"
  }
  if(type =="Church"){
    return "/assets/icon/iglesia.png"
  }
  if(type =="Arqueological"){
    return "/assets/icon/arqueological.png"
  }
  if(type =="Tower"){
    return "/assets/icon/tower.png"
  }
  if(type =="Monument"){
    return "/assets/icon/monument.png"
  }
}

initMarkerModal() {
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


}
function getInfoFromMarker(marker: MarkerClickCallbackData) {
  let markerClickedInfo;
  data.map(pit =>{
    if(pit.Nombre === marker.title){
      markerClickedInfo = pit
    }}
  )
  return markerClickedInfo
}

