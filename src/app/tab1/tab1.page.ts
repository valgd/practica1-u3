import { Component } from '@angular/core';
import { Product } from '../models/products.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products : Product[] = [];
  public productsFounds: Product[] = [];
  public filter = [
    "Abarrotes",
    "Frutas y verduras",
    "Limpieza",
    "Farmacia"
  ];

  // public car: Product[] = [];
  public car: { [productId: number]: { product: Product, quantity: number } } = {};
  

  public categoryColors: { [key: string]: string } = {
    "Abarrotes": "blue",
    "Frutas y verduras": "green",
    "Limpieza": "red",
    "Farmacia": "orange"
  };

  constructor() {
    this.products.push({
      id: 1,
      name: "Coca Cola",
      price: 20,
      description: "Bebida coca cola", 
      type: "Abarrotes",
      photo: "https://picsum.photos/500/300?random=1",
    });
    this.products.push({
      id: 2,
      name: "Jabón zote",
      price: 40,
      description: "Jabón en barra", 
      type: "Limpieza",
      photo: "https://picsum.photos/500/300?random=1",
    });

    this.products.push({
      id: 3,
      name: "Manzana",
      price: 20,
      description: "Kilo de manzanas perón", 
      type: "Frutas y verduras",
      photo: "https://picsum.photos/500/300?random=1",
    });

    this.products.push({
      id: 4,
      name: "Paracetamol",
      price: 35,
      description: "Caja con 20 pastillas", 
      type: "Farmacia",
      photo: "https://picsum.photos/500/300?random=1",
    });
    this.productsFounds = this.products;
  }

  public filterProducts(): void{
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );

  }

  public addToCar(producto: Product): void {
    const productId = producto.id;
    if (this.car[productId]) {
      this.car[productId].quantity++;
    } else {
      this.car[productId] = { product: producto, quantity: 1 };
    }
  }

  public carritoVacio(): boolean {
    return Object.keys(this.car).length === 0;
  }

  public get carritoArray(): { product: Product, quantity: number }[] {
    return Object.values(this.car);
  }

  public calcularSubtotal(producto: Product): number {
    const productId = producto.id;
    if (this.car[productId]) {
      const quantity = this.car[productId].quantity;
      return producto.price * quantity;
    } else {
      return 0;
    }
  }
  

  public calcularTotalCarrito(): number {
    let total = 0;
    for (const productId of Object.keys(this.car)) {
      const producto = this.car[parseInt(productId)].product;
      const quantity = this.car[parseInt(productId)].quantity;
      total += producto.price * quantity;
    }
    return total;
  }

  public deleteFromCar(producto: Product): void {
    const productId = producto.id;
    if (this.car[productId]) {
      if (this.car[productId].quantity > 1) {
        this.car[productId].quantity--;
      } else {
        delete this.car[productId];
      }
    }
  }
  

}
