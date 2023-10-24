import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: { product: Product, quantity: number }[] = [];

  private carritoSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>(this.carrito);

  agregarAlCarrito(producto: Product): void {
    const productId = producto.id;
    const item = this.carrito.find((el) => el.product.id === productId);
    if (item) {
      item.quantity++;
    } else {
      this.carrito.push({ product: producto, quantity: 1 });
    }
    this.carritoSubject.next(this.carrito);
  }

  obtenerCarrito(): Observable<{ product: Product, quantity: number }[]> {
    return this.carritoSubject.asObservable();
  }

  // Otros métodos para gestionar el carrito

  // ...
}
