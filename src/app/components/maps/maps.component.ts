import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  // mapRef = document.getElementById('map');


  // mapOptions = {
  //   id: 'my-map',
  //   apiKey: "",
  //   config: {
  //     center: {
  //       lat: 33.6,
  //       lng: -117.9,
  //     },
  //     zoom: 8,
  //     androidLiteMode: false,
  //   },
  //   element:  document.getElementById('map'),
  // }

  constructor() {
   }

  ngOnInit() {
    //this.initMap()
}

  async createMap(){
    //const map = await GoogleMap.create(this.mapOptions)

    
  // const newMap = await GoogleMap.create({
  //   id: 'my-map', // Unique identifier for this map instance
  //     element: this.mapRef, // reference to the capacitor-google-map element
  //     apiKey: '', // Your Google Maps API Key
  //     config: {
  //       center: {
  //         // The initial position to be rendered by the map
  //         lat: 33.6,
  //         lng: -117.9,
  //       },
  //       zoom: 8, // The initial zoom level to be rendered by the map
  //     },
  //   });
  }
}
