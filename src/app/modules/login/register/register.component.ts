import { Component, OnInit } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem, IonLabel,
  IonList, IonSelect, IonSelectOption,
  IonTitle, IonToast
} from "@ionic/angular/standalone";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../service/user.service";
import {UserRegistration} from "../../../model/userRegistration";
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";

interface RoleOption {
  label: string;
  value: 'ROLE_USER' | 'ROLE_GERENTE' | 'ROLE_ADMIN';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ButtonModule, RouterLink, IonIcon, FormsModule, ReactiveFormsModule, IonInput, IonItem, IonList, IonTitle, IonInput, IonButton, IonInputPasswordToggle, NgIf, IonSelect, NgForOf, IonSelectOption, IonLabel, IonToast]
})
export class RegisterComponent  implements OnInit {

  errorLogin: boolean = false;

  errorMessage: string = "";

  nome: string = "";

  cpf: string = "";

  usuario: string = "";

  email: string = "";

  senha: string = "";

  roles: RoleOption[] = [];

  tipoDePermissao: 'ROLE_USER' | 'ROLE_GERENTE' | 'ROLE_ADMIN' | undefined;

  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {
    this.roles = [
      { label: 'Usuário', value: 'ROLE_USER' },
      { label: 'Gerente', value: 'ROLE_GERENTE' },
      { label: 'Administrador', value: 'ROLE_ADMIN' },
    ];
  }

  register() {
    if(this.nome != "" && this.cpf != "" && this.email != "" && this.tipoDePermissao != undefined && this.usuario != "" && this.senha != ""){
      this.loading = true;
      this.userService.register(new UserRegistration({name: this.nome, cpf: this.cpf, email: this.email, role: this.tipoDePermissao, username: this.usuario, password: this.senha})).subscribe({
        next: (usuario) => {
          this.router.navigate(['/login/login']);
        },
        error: (error) => {
          this.errorMessage = 'Falha ao cadastrar o usuário. Verifique seus dados e tente novamente.';
          this.errorLogin = true;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

}
