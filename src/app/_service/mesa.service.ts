import { Injectable } from '@angular/core';
import { Mesa } from '../_model/mesa';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MesaService extends GenericService<Mesa> {

  private MesaCambio = new Subject<Mesa[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/mesas`

    )
  }

  getMesaCambio() {
    return this.MesaCambio.asObservable();
  }

  setMesaCambio(productos: Mesa[]) {
    this.MesaCambio.next(productos);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
