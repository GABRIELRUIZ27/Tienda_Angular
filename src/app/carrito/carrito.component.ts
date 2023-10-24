import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../core/services/carrito.service';
import { Carrito } from 'src/app/models/carrito';
import { ArticuloService } from '../core/services/articulo.service';  
import { Articulos } from 'src/app/models/articulo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito[] = [];
  articulos: Articulos[] = []; 

  constructor(
    private carritoService: CarritoService,
    private articuloService: ArticuloService
  ) {}

  ngOnInit(): void {
    this.carritoService.getClientes().subscribe(
      (data) => {
        this.carrito = data;
        console.log('Pedidos recibidos:', this.carrito);

        this.articuloService.getArticulos().subscribe((articulos) => {
          this.articulos = articulos;

          this.carrito.map((item) => {
            const articulo = this.articulos.find((a) => a.codigo === item.articuloId);
            if (articulo) {
              item.articuloDescripcion = articulo.descripcion;
            }
          });
        });
      },
      (error) => {
        console.error('Error al recibir los pedidos:', error);
      }
    );
  }

  eliminarDelCarrito(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cancelara tu compra.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.eliminarArticuloDelCarrito(id).subscribe(
          () => {
            Swal.fire('Cancelado', 'El pedido ha sido cancelado con éxito.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al eliminar el pedido.', 'error');
            console.error('Error al eliminar artículo del carrito:', error);
          }
        );
      }
    });
  }
}
