import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Orden } from '../_model/orden';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService extends GenericService<Orden >{
  private OrdenCambio = new Subject<Orden[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/ordenes`

    )
  }

  getOrdenCambio() {
    return this.OrdenCambio.asObservable();
  }

  setOrdenCambio(ordenes: Orden[]) {
    this.OrdenCambio.next(ordenes);

  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
