import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonItem, IonList, IonButton, IonInputPasswordToggle, IonLabel, IonButtons, IonBackButton, IonNav, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ButtonModule, RouterLink, IonIcon, IonNav, IonBackButton, IonButtons, IonLabel, FormsModule, ReactiveFormsModule, IonInput, IonItem, IonList, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonInputPasswordToggle]
})
export class LoginComponent implements OnInit {

  formLogin = {
    usuario: "",
    senha: ""
  };

  isLoggedIn: boolean = true;

  usuario: string = "";

  senha: string = "";

  constructor() { 
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {}

  setValue(variavel: string, valor: any) {
    this[variavel as keyof this] = valor.value;
  }

  entrar() {
    
  }

  registrar() {
    
  }

}
