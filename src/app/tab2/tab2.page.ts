import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product.models';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public carrito: { product: Product, quantity: number }[] = [];

  constructor(
    private carritoService: CarritoService,
    private toastController: ToastController
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

  public async realizarPago(): Promise<void> {
    // Aquí puedes realizar acciones de pago, por ejemplo, comunicarte con un servicio de pago.

    // Actualiza tu servicio para vaciar el carrito (elimina directamente los elementos).
    this.carritoService.vaciarCarrito();

    // Añade un mensaje de "Pago realizado" utilizando el servicio Toast.
    this.mostrarMensaje("Pago realizado con éxito");
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración del mensaje en milisegundos
      position: 'bottom', // Posición del mensaje en la pantalla
    });
    toast.present();
  }
}
