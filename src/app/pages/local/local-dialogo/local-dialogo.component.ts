import { Component, OnInit, Inject } from '@angular/core';
import { Local } from '../../../_model/local';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { LocalService } from '../../../_service/local.service';

@Component({
  selector: 'app-local-dialogo',
  templateUrl: './local-dialogo.component.html',
  styleUrls: ['./local-dialogo.component.css']
})
export class LocalDialogoComponent implements OnInit {
  local: Local;

  constructor(
    private dialogRef: MatDialogRef<LocalDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Local,
    private localService: LocalService,
  ) { }

  ngOnInit(): void {
    this.local = new Local();
    this.local.idLocal = this.data.idLocal;
    this.local.nombre = this.data.nombre;
    this.local.direccion = this.data.direccion;
    this.local.comuna = this.data.comuna;
  }

  operar() {
    if (this.local != null && this.local.idLocal > 0) {
      //MODIFICAR
      //PRACTICA IDEAL
      this.localService.modificar(this.local).pipe(switchMap(() => {
        return this.localService.listar();
      })).subscribe(data => {
        this.localService.setLocalCambio(data);
        this.localService.setMensajeCambio('MODIFICADO');
      });
    } else {
      //REGISTRAR
      this.localService.crear(this.local).pipe(switchMap(() => {
        return this.localService.listar();
      })).subscribe(data => {
        this.localService.setLocalCambio(data);
        this.localService.setMensajeCambio('REGISTRADO');
      });
    }
    this.cerrar();
  }


  cerrar() {
    this.dialogRef.close();
  }

}
