import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Producto } from '../../../_model/producto';
import { TipoProducto } from '../../../_model/tipoProducto';
import { ProductoService } from '../../../_service/producto.service';
import { TipoProductoService } from '../../../_service/tipo-producto.service';

@Component({
  selector: 'app-producto-dialogo',
  templateUrl: './producto-dialogo.component.html',
  styleUrls: ['./producto-dialogo.component.css']
})
export class ProductoDialogoComponent implements OnInit {

  producto: Producto;
  descripcion$: Observable<TipoProducto[]>;

  idTipoSeleccionado: number;

  constructor(
    private dialogRef: MatDialogRef<ProductoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Producto,
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService
  ) { }

  ngOnInit(): void {
    this.descripcion$ = this.tipoProductoService.listar();

    this.producto = new Producto();
    this.producto.idProducto = this.data.idProducto;
    this.producto.nombre = this.data.nombre;
    this.producto.tiempoPreparacion = this.data.tiempoPreparacion;
    this.producto.precio = this.data.precio;
    this.producto.idTipo = this.data.idTipo;

    const tip = new TipoProducto();
    tip['idTipoProducto'] = Number(this.data.idTipo);
    this.producto.tipoproducto = tip;

  }

  selected(event) {
    let target = event.source.selected._element.nativeElement;
    let selected = {
      value: event.value,
      text: target.innerText.trim()
    };
    console.log(selected.value); 
    const ent = new TipoProducto()
    this.idTipoSeleccionado = selected.value;
  
    ent['idTipoProducto'] = this.idTipoSeleccionado
    this.producto.tipoproducto = ent;

  }

  operar() {
    if (this.producto != null && this.producto.idProducto > 0) {
      //MODIFICAR
      //PRACTICA IDEAL
      this.productoService.modificar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('MODIFICADO');
      });
    } else {
      //REGISTRAR
      console.log(this.producto);
      this.productoService.crear(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('REGISTRADO');
      });
    }
    this.cerrar();
  }


  cerrar() {
    this.dialogRef.close();
  }

}
