import { Injectable } from '@angular/core';
import { Reserva } from '../_model/reserva';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})

export class ReservaService extends GenericService < Reserva> {
  private ReservaCambio = new Subject<Reserva[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/reservas`

    )
  }

  getReservaCambio() {
    return this.ReservaCambio.asObservable();
  }

  setReservaCambio(reservas: Reserva[]) {
    this.ReservaCambio.next(reservas);

  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}

