import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonItem, IonList, IonButton, IonInputPasswordToggle, IonLabel, IonButtons, IonBackButton, IonNav, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import {AuthService} from "../../../service/auth-service.service";
import {JwtResponse} from "../../../model/jwtResponse";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ButtonModule, RouterLink, IonIcon, FormsModule, ReactiveFormsModule, IonInput, IonItem, IonList, IonTitle, IonInput, IonButton, IonInputPasswordToggle, NgIf]
})
export class LoginComponent implements OnInit {


  isLoggedIn: boolean = true;

  usuario: string = "";

  senha: string = "";

  loading: boolean = false;

  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {}

  entrar() {
    this.loading = true;
    this.authService.login(this.usuario, this.senha).subscribe({
      next: (response) => {
        const token = response.token; // Esperando a resposta com o token JWT
        if (token) {
          console.log('Autenticado com sucesso!');
          this.router.navigate(['/pedidos']);
        }
      }, error: (error) => {
        this.errorMessage = 'Falha na autenticação. Verifique suas credenciais.';
        console.error('Erro de autenticação', error);
        this.loading = false;
      }
    });

  }

  registrar() {

  }

}
