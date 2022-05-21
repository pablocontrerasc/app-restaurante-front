import { Injectable } from '@angular/core';
import { Local } from '../_model/local';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalService extends GenericService< Local> {

  private localCambio = new Subject<Local[]>();
  private mensajeCambio = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST }/locales`

    )
   }

  getLocalCambio() {
    return this.localCambio.asObservable();
  }

  setLocalCambio(locales: Local[]) {
    this.localCambio.next(locales);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }
}

