import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(nombre: string, apellidos: string): number | null {
    

    if (nombre === 'Gabriel' && apellidos === 'Ruiz') {
      const clienteId = 1;

      localStorage.setItem('clienteId', clienteId.toString());

      return clienteId;
    } else if (nombre === 'Jose' && apellidos === 'Ruiz') {
      const clienteId = 2;

      localStorage.setItem('clienteId', clienteId.toString());

      return clienteId;
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('clienteId');
  }

  getClienteId(): number | null {
    const clienteId = localStorage.getItem('clienteId');
    if (clienteId) {
      return parseInt(clienteId, 10);
    }
    return null;
  }
}
