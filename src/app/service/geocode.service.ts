import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Coordenadas} from "../model/coordenadas";

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  baseUrl: string = "https://deliveryroutesbackend.up.railway.app";

  constructor(private _http: HttpClient) { }

  getCoordenadas(address: string): Observable<Coordenadas> {
    return this._http.get<Coordenadas>(`${this.baseUrl}/geocode/coordenadas`, {params: {address}});
  }
}
