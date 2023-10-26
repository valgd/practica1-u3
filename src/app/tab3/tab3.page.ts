import { Component } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  productosFavoritos: any[] = [];

  constructor(private favoritosService: FavoritosService,
    private carritoService: CarritoService) {}

  ionViewWillEnter() {
    this.productosFavoritos = this.favoritosService.obtenerFavoritos();
  }

  eliminarDeFavoritos(producto: any) {
    this.favoritosService.eliminarFavorito(producto);
      this.productosFavoritos = this.favoritosService.obtenerFavoritos();
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto);
  }
}
