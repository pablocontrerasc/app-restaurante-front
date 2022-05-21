import { Component, OnInit, Inject } from '@angular/core';
import { Orden } from '../../../_model/orden';
import { Cliente } from '../../../_model/cliente';
import { Observable } from 'rxjs';
import { Mesa } from '../../../_model/mesa';
import { Producto } from '../../../_model/producto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdenService } from '../../../_service/orden.service';
import { ProductoService } from '../../../_service/producto.service';
import { MesaService } from '../../../_service/mesa.service';
import { ClienteService } from '../../../_service/cliente.service';
import { switchMap } from 'rxjs/operators';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-orden-dialogo',
  templateUrl: './orden-dialogo.component.html',
  styleUrls: ['./orden-dialogo.component.css']
})
export class OrdenDialogoComponent implements OnInit {

  orden: Orden;
  nombrec$: Observable<Cliente[]>;
  nombrem$: Observable<Mesa[]>;
  nombrep$: Observable<Producto[]>;

  idProductoSeleccionado: number;
  idMesaSeleccionado: number;
  idClienteSeleccionado: number;

  constructor(
    private dialogRef: MatDialogRef<OrdenDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Orden,
    private ordenService: OrdenService,
    private productoService: ProductoService,
    private mesaServive: MesaService,
    private clienteService: ClienteService

  ) { }

  ngOnInit(): void {
    this.nombrec$ = this.clienteService.listar();
    this.nombrem$ = this.mesaServive.listar();
    this.nombrep$ = this.productoService.listar();

    this.orden = new Orden();
    this.orden.idOrden = this.data.idOrden;
    this.orden.fecha =new Date().toLocaleDateString()  +' '+  new Date().toLocaleTimeString() 
   // this.orden.fecha = new Date().toISOString().slice(0,20); 
   
    this.orden.confirmacion = this.data.confirmacion;
    this.orden.idCliente = this.data.idCliente;
    this.orden.idProducto = this.data.idProducto;
    this.orden.idMesa = this.data.idMesa

    const pro = new Producto();
    pro['idProducto'] = Number(this.data.idProducto);
    this.orden.producto = pro;

    const me = new Mesa();
    me['idMesa'] = Number(this.data.idMesa);
    this.orden.mesa = me;

    const cli = new Cliente();
    cli['idCliente'] = Number(this.data.idCliente);
    this.orden.cliente = cli;


  }

  selected(event) {
    let target = event.source.selected._element.nativeElement;
    let selected = {
      value: event.value,
      text: target.innerText.trim()
    };
    console.log(selected.value); 
    
    const entp = new Producto()
    this.idProductoSeleccionado = selected.value;
  
    entp['idProducto'] = this.idProductoSeleccionado
    this.orden.producto = entp;

    const entm = new Mesa()
    this.idMesaSeleccionado = selected.value;
  
    entm['idMesa'] = this.idMesaSeleccionado
    this.orden.mesa = entm;

    const entc = new Cliente()
    this.idClienteSeleccionado = selected.value;
  
    entc['idCliente'] = this.idClienteSeleccionado
    this.orden.cliente = entc;

  }

  operar() {
    if (this.orden != null && this.orden.idOrden > 0) {
      //MODIFICAR
      //PRACTICA IDEAL
      this.ordenService.modificar(this.orden).pipe(switchMap(() => {
        return this.ordenService.listar();
      })).subscribe(data => {
        this.ordenService.setOrdenCambio(data);
        this.ordenService.setMensajeCambio('MODIFICADO');
      });
    } else {
      //REGISTRAR
      console.log(this.orden);
      this.ordenService.crear(this.orden).pipe(switchMap(() => {
        return this.ordenService.listar();
      })).subscribe(data => {
        this.ordenService.setOrdenCambio(data);
        this.ordenService.setMensajeCambio('REGISTRADO');
      });
    }
    this.cerrar();
  }


  cerrar() {
    this.dialogRef.close();
  }

}
