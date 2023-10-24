import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloTienda } from 'src/app/models/articuloTienda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaArticuloService {
  route = `https://localhost:7229/api/articuloTienda`;

  constructor(private http: HttpClient) {}

  getProductosTienda(): Observable<ArticuloTienda[]> {
    return this.http.get<ArticuloTienda[]>(`${this.route}/Get_TiendaArticulo`);
  }
}
