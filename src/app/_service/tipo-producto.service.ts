import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TipoProducto } from '../_model/tipoProducto';
import { environment } from './../../environments/environment'
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class TipoProductoService extends GenericService<TipoProducto> {

  private tipoProductoCambio = new Subject<TipoProducto[]>();
  private mensajeCambio = new Subject<string>();
  
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST }/tipoproductos`

    )
   }

  getTipoProductoCambio() {
    return this.tipoProductoCambio.asObservable();
  }

  setTipoProductoCambio(tipoproductos: TipoProducto[]) {
    this.tipoProductoCambio.next(tipoproductos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }
}
