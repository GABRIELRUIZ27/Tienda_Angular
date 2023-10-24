import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  route = `https://localhost:7229/api/Tienda`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(`${this.route}/Get_Tienda`).pipe(
      map((response: any) => response) 
    );
  }
}
