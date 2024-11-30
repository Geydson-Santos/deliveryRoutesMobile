/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {} from 'googlemaps';
//import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonButton, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {
    
  }

  async initMap() {
    /*const apiKey = 'YOUR_API_KEY_HERE';

    const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef || new HTMLElement(), // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });*/


  }
  
}
