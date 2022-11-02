import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-position-selector',
  templateUrl: './map-position-selector.page.html',
  styleUrls: ['./map-position-selector.page.scss'],
})
export class MapPositionSelectorPage implements OnInit {
  @ViewChild('map')mapRef: ElementRef;
  @ViewChild('popover') popover;

  map: GoogleMap;
  isPopOverOpen = false;
  markerId
  coords ={
    lat: null,
    long: null
  }
  marker : Marker = {
    coordinate: {
      lat:  40.48205,
      lng: -3.36996
    },
    title: "Lugar de comienzo",
    snippet:"Aquí comenzará la ruta",
    draggable: true
  }
  
  constructor(
    private modalCtrl: ModalController
  ) { }
  ionViewDidEnter(){
    this.createMap();
  }
  
  ngOnInit() {
    this.presentPopover()
  }
  presentPopover() {
    this.isPopOverOpen = true;
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
        zoom: 15,
      },
    })
  this.createSelectionMarker()
  }
  async createSelectionMarker() {
     this.markerId = await this.map.addMarker(this.marker
);
    this.createMarkerListeners()
  }
  createMarkerListeners() {
    
    this.map.setOnMarkerDragEndListener((marker)=>{
      this.coords.lat = marker.latitude
      this.coords.long = marker.longitude
    }
)
  }



    
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
        return this.modalCtrl.dismiss(this.coords, 'confirm');
  }
}
