import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  route = `https://localhost:7229/api/Cliente`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.route}/Cliente`).pipe(
      map((response: any) => response) 
    );
  }
}
