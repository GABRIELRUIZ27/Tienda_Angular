import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../core/services/articulo.service';
import { Articulos } from 'src/app/models/articulo';
import { CarritoService } from '../core/services/carrito.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import Swal from 'sweetalert2';
import { TiendaArticuloService } from '../core/services/tiendaArticulo.service';
import { ArticuloTienda } from '../models/articuloTienda';
import { TiendaService } from '../core/services/tienda.service';
import { Tienda } from '../models/tienda';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  articulos: Articulos[] = [];
  articulosTienda: ArticuloTienda[] = [];
  tiendas: Tienda[] = []; 

  constructor(
    private articuloService: ArticuloService,
    private carritoService: CarritoService,
    private mensajeService: MensajeService,
    private tiendaArticuloService: TiendaArticuloService,
    private tiendaService: TiendaService 
  ) {}

  ngOnInit(): void {
    this.tiendaService.getClientes().subscribe((data) => {
      this.tiendas = data;
    });

    this.tiendaArticuloService.getProductosTienda().subscribe((data) => {
      this.articulosTienda = data;
    });
    this.articulos.map((item) => {
      const articulo = this.articulos.find((a) => a.codigo === item.codigo);
      if (articulo) {
        item.sucursal = articulo.sucursal;
      }
    });
    this.articuloService.getArticulos().subscribe(
      (data) => {
        this.articulos = data;
        console.log('Artículos recibidos:', this.articulos);
      },
      (error) => {
        console.error('Error al recibir los artículos:', error);
      }
    );
  }
  

  agregarAlCarrito(articuloId: number) {
    const clienteId = 1;
    const fecha = new Date();

    Swal.fire({
      title: 'Verificar Existencia en Tienda',
      text: '¿Estás seguro de que deseas agregar este artículo al carrito? Asegúrate de verificar la existencia en tu sucursal preferida antes de continuar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar'
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoArticuloEnCarrito = {
          clienteId,
          articuloId,
          fecha,
        };

        this.carritoService.agregarArticuloAlCarrito(nuevoArticuloEnCarrito)
          .subscribe(
            () => {
              Swal.fire('Éxito', 'Artículo comprado con éxito', 'success');
            },
            (error) => {
              Swal.fire('Error', 'No se pudo comprar el artículo', 'error');
              console.error('Error al agregar artículo al carrito:', error);
            }
          );
      }
    });
  }
}
