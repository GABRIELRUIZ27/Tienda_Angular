import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulos } from 'src/app/models/articulo'; 

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private route = `https://localhost:7229/api/Articulo`;

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<Articulos[]> {
    return this.http.get<Articulos[]>(`${this.route}/Get_Articulo`);
  }
}
