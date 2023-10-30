import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product.model';
import { ToastController } from '@ionic/angular';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public carrito: { product: Product, quantity: number }[] = [];

  constructor(
    private carritoService: CarritoService,
    private toastController: ToastController,
    private compraService: CompraService
  ) {}

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

  async realizarPago(): Promise<void> {
    if (this.carrito.length > 0) {
      this.carritoService.registrarCompra(); // Registra la compra con los productos actuales en el carrito

      this.mostrarMensaje('Pago realizado con éxito');
    }
  }
  

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000, // Duración del mensaje en milisegundos
      position: 'bottom', // Posición del mensaje en la pantalla
    });
    toast.present();
  }
}
