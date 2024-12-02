import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pedido} from "../model/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  baseUrl: string = "https://deliveryroutesbackend.up.railway.app";

  constructor(private _http: HttpClient) { }

  getAllPedidos(): Observable<Pedido[]> {
    return this._http.get<Pedido[]>(`${this.baseUrl}/pedidos`);
  }

  createPedido(pedido: Pedido): Observable<Pedido> {
    return this._http.post<Pedido>(`${this.baseUrl}/pedidos`, pedido);
  }
}
