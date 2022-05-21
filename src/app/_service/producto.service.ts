import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../_model/producto';
import { environment } from './../../environments/environment'
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService < Producto > {

  private ProductoCambio = new Subject<Producto[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/productos`

    )
  }

  getProductoCambio() {
    return this.ProductoCambio.asObservable();
  }

  setProductoCambio(productos: Producto[]) {
    this.ProductoCambio.next(productos);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
