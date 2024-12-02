import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {IonContent, IonButton, IonToast} from '@ionic/angular/standalone';
import {AuthService} from "../../../service/auth-service.service";

@Component({
  selector: 'app-home',
  templateUrl: 'login-home-page.component.html',
  styleUrls: ['login-home-page.component.scss'],
  standalone: true,
  imports: [RouterLink, IonButton, IonContent, IonToast]
})

export class LoginHomePage implements OnInit {

  toastOpen: boolean = false;

  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');

    if(token){
      let tokenValid: boolean = this.authService.verifyIsTokenExpired(token || "");

      if(tokenValid){
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = "Suas credenciais expiraram!";
        this.openToastError(true);
      }
    }
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

  openToastError(open: boolean) {
    this.toastOpen = open;
  }

}
