import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonItem, IonList, IonButton, IonInputPasswordToggle, IonLabel, IonButtons, IonBackButton, IonNav, IonIcon, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import {AuthService} from "../../../service/auth-service.service";
import {JwtResponse} from "../../../model/jwtResponse";
import {NgIf} from "@angular/common";
import {User} from "../../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonToast, ButtonModule, RouterLink, IonIcon, FormsModule, ReactiveFormsModule, IonInput, IonItem, IonList, IonTitle, IonInput, IonButton, IonInputPasswordToggle, NgIf]
})
export class LoginComponent implements OnInit {

  errorLogin: boolean = false;

  errorMessage: string = "";

  usuario: string = "";

  senha: string = "";

  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {

    if(localStorage.getItem('currentUser')){
      let objetoUsuario: any = JSON.parse(localStorage.getItem('currentUser') || "");
      this.usuario = objetoUsuario.username;
      this.senha = objetoUsuario.password;
      this.entrar(true);
    }
  }

  entrar(jaCadastrado?: boolean) {
    if(this.usuario != "" || this.senha != ""){
      this.loading = true;
      this.authService.login(this.usuario, this.senha).subscribe({
        next: (response) => {
          const token = response.token; // Esperando a resposta com o token JWT
          if (token) {
            this.router.navigate(['/home']);
          }
        }, error: (error) => {
          this.errorMessage = error.message;
          this.openToastError(true);
          console.error('Erro de autenticação', error);
          this.loading = false;
        }, complete: () => {
          this.loading = false;
          if(jaCadastrado) localStorage.removeItem('currentUser');
        }
      });
    }
  }

  openToastError(open: boolean) {
    this.errorLogin = open;
  }

}
