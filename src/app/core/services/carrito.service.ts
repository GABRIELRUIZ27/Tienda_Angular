import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from 'src/app/models/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  route = `https://localhost:7229/api/ClienteArticulo`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.route}/Get_ClienteArticulo`);
  }

  agregarArticuloAlCarrito(nuevoArticulo: any): Observable<any> {
    return this.http.post(`${this.route}/Post_ClienteArticulo`, nuevoArticulo);
  }

  eliminarArticuloDelCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.route}/Delete_ClienteArticulo/${id}`);
  }
}
