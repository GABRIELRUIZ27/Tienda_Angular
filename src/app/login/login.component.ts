import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service'; 
import { MensajeService } from 'src/app/core/services/mensaje.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = ''; 
  contrasena: string = ''; 

  constructor(private router: Router, 
    private authService: AuthService,
    private mensajeService: MensajeService
    ) { }

  IniciarSesion() {
    const correo = this.correo;
    const contrasena = this.contrasena;

    const clienteId = this.authService.login(correo, contrasena);

    if (clienteId !== null) {
      this.router.navigate(['/inicio']);
    } else {
      this.mensajeService.mensajeError("Usuario y contraseña no encontrados.");
      console.log('Autenticación fallida');
    }
  }

  abrirRegistroModal() {
    const registroModal = document.getElementById('registroModal');
    if (registroModal) {
      registroModal.classList.add('show');
      registroModal.style.display = 'block';
    }
  }

  cerrarRegistroModal() {
    const registroModal = document.getElementById('registroModal');
    if (registroModal) {
      registroModal.classList.remove('show');
      registroModal.style.display = 'none';
    }
  }

  crearUsuario() {
    // Implementa la lógica para crear un nuevo usuario, si es necesario
  }
}
