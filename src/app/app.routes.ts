import { Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', loadChildren: () => LoginModule},
  {path: 'home', component: HomePage},
];
