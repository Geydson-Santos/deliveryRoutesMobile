import { Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import {HomeComponent} from "./modules/home/home.component";
import {PedidosModule} from "./modules/pedidos/pedidos.module";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', loadChildren: () => LoginModule},
  {path: 'pedidos', loadChildren: () => PedidosModule},
];
