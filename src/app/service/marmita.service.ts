import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Marmita} from "../model/marmita";

@Injectable({
  providedIn: 'root'
})
export class MarmitaService {
  baseUrl: string = "https://deliveryroutesbackend.up.railway.app";

  constructor(private _http: HttpClient) { }

  getAllMarmitas(): Observable<Marmita[]> {
    return this._http.get<Marmita[]>(`${this.baseUrl}/marmitas`);
  }
}
