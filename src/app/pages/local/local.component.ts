import { Component, OnInit, ViewChild } from '@angular/core';
import { Local } from '../../_model/local';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LocalService } from '../../_service/local.service';
import { switchMap } from 'rxjs/operators';
import { LocalDialogoComponent } from './local-dialogo/local-dialogo.component';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  local: Local;
  idLocal: number;

  displayedColumns = ['idLocal','nombre','direccion','comuna','acciones']
  dataSource: MatTableDataSource<Local>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private localService: LocalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.localService.getLocalCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.localService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Notificación', { duration: 4000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    })

    this.localService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  crear(){
    this.dialog.open(LocalDialogoComponent);
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEst: number) {
    this.localService.eliminar(idEst['idLocal']).pipe(switchMap(() => {
      return this.localService.listar();
    })).subscribe(data => {
      this.localService.setLocalCambio(data);
      this.localService.setMensajeCambio('ELIMINADO');
    });
  }

  abrirDialogo(cppEst?: Local) {
    let aut = cppEst != null ? cppEst : new Local();
    this.dialog.open(LocalDialogoComponent, {
      width: '250px',
      data: aut
    })
  }

}
