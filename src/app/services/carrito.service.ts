import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: { product: Product, quantity: number }[] = [];
  private carritoSubject: BehaviorSubject<{ product: Product, quantity: number }[]> = new BehaviorSubject(this.carrito);

  constructor() {}

  public agregarAlCarrito(producto: Product): void {
    const productoEnCarrito = this.carrito.find((item) => item.product.id === producto.id);

    if (productoEnCarrito) {
      productoEnCarrito.quantity++;
    } else {
      this.carrito.push({ product: producto, quantity: 1 });
    }

    this.carritoSubject.next(this.carrito);
  }

  public obtenerCarrito(): Observable<{ product: Product, quantity: number }[]> {
    return this.carritoSubject.asObservable();
  }

  public vaciarCarrito(): void {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }
}
