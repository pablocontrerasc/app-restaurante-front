import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../_model/cliente';
import { environment } from './../../environments/environment'
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente> {

  private clienteCambio = new Subject<Cliente[]>();
  private mensajeCambio = new Subject<string>();
 // private url: string = `${environment.HOST}/clientes`
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/clientes`

    )
   }

  // listar() {
  //   return this.http.get<Cliente[]>(this.url);

  // }

  // listarPorId(id: number) {
  //   return this.http.get<Cliente>(`${this.url}/${id}`);
  // }

  // registrar(cliente: Cliente) {
  //   return this.http.post(this.url, cliente);
  // }

  // modificar(cliente: Cliente) {
  //   return this.http.put(this.url, cliente);
  // }

  // eliminar(id: number) {
  //   return this.http.delete(`${this.url}/${id}`);

  // }

  getClienteCambio() {
    return this.clienteCambio.asObservable();
  }

  setClienteCambio(clientes: Cliente[]) {
    this.clienteCambio.next(clientes);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }
}
