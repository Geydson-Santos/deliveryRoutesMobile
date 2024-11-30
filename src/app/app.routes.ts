import { Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { HomePage } from './modules/home/home.page';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', loadChildren: () => LoginModule},
  {path: 'home', component: HomePage},
];
