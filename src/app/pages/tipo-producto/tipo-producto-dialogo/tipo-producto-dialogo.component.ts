import { Component, Inject, OnInit } from '@angular/core';
import { TipoProducto } from '../../../_model/tipoProducto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoProductoService } from '../../../_service/tipo-producto.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tipo-producto-dialogo',
  templateUrl: './tipo-producto-dialogo.component.html',
  styleUrls: ['./tipo-producto-dialogo.component.css']
})
export class TipoProductoDialogoComponent implements OnInit {
  tipoproducto: TipoProducto;

  constructor(
    private dialogRef: MatDialogRef<TipoProductoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TipoProducto,
    private tipoProductoService: TipoProductoService,
  ) { }

  ngOnInit(): void {
    this.tipoproducto = new TipoProducto();
    this.tipoproducto.idTipoProducto = this.data.idTipoProducto;
    this.tipoproducto.descripcion = this.data.descripcion;
  }

  operar() {
    if (this.tipoproducto != null && this.tipoproducto.idTipoProducto > 0) {
      //MODIFICAR
      //PRACTICA IDEAL
      this.tipoProductoService.modificar(this.tipoproducto).pipe(switchMap(() => {
        return this.tipoProductoService.listar();
      })).subscribe(data => {
        this.tipoProductoService.setTipoProductoCambio(data);
        this.tipoProductoService.setMensajeCambio('MODIFICADO');
      });
    } else {
      //REGISTRAR
      this.tipoProductoService.crear(this.tipoproducto).pipe(switchMap(() => {
        return this.tipoProductoService.listar();
      })).subscribe(data => {
        this.tipoProductoService.setTipoProductoCambio(data);
        this.tipoProductoService.setMensajeCambio('REGISTRADO');
      });
    }
    this.cerrar();
  }


  cerrar() {
    this.dialogRef.close();
  }

}
