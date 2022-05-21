import { Component, OnInit, Inject } from '@angular/core';
import { Mesa } from '../../../_model/mesa';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MesaService } from '../../../_service/mesa.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mesa-dialogo',
  templateUrl: './mesa-dialogo.component.html',
  styleUrls: ['./mesa-dialogo.component.css']
})
export class MesaDialogoComponent implements OnInit {

  mesa: Mesa;

  constructor(
    private dialogRef: MatDialogRef<MesaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Mesa,
    private tipoProductoService: MesaService,
  ) { }

  ngOnInit(): void {
    this.mesa = new Mesa();
    this.mesa.idMesa = this.data.idMesa;
    this.mesa.capacidad = this.data.capacidad;
    this.mesa.descripcion = this.data.descripcion;
  }

  operar() {
    if (this.mesa != null && this.mesa.idMesa > 0) {
      //MODIFICAR
      //PRACTICA IDEAL
      this.tipoProductoService.modificar(this.mesa).pipe(switchMap(() => {
        return this.tipoProductoService.listar();
      })).subscribe(data => {
        this.tipoProductoService.setMesaCambio(data);
        this.tipoProductoService.setMensajeCambio('MODIFICADO');
      });
    } else {
      //REGISTRAR
      this.tipoProductoService.crear(this.mesa).pipe(switchMap(() => {
        return this.tipoProductoService.listar();
      })).subscribe(data => {
        this.tipoProductoService.setMesaCambio(data);
        this.tipoProductoService.setMensajeCambio('REGISTRADO');
      });
    }
    this.cerrar();
  }


  cerrar() {
    this.dialogRef.close();
  }

}

