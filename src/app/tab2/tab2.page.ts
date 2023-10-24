import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product.models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public carrito: { product: Product, quantity: number }[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe((carrito) => {
      this.carrito = carrito;
    });
  }
  public calcularTotalCarrito(): number {
    let total = 0;
    for (const item of this.carrito) {
      total += item.product.price * item.quantity;
    }
    return total;
  }
}
