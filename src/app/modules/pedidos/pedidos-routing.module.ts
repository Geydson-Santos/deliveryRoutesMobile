import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PedidosCreateComponent} from "./create/pedidos-create.component";

const routes: Routes = [
  {path: "", redirectTo: "create", pathMatch: "full"},
  {path: "create", component: PedidosCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
