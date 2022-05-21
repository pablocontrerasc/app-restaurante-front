import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { TipoProductoService } from '../../_service/tipo-producto.service';
import { TipoProducto } from '../../_model/tipoProducto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TipoProductoDialogoComponent } from './tipo-producto-dialogo/tipo-producto-dialogo.component';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent implements OnInit {
  tipoproducto: TipoProducto;
  idTipoProductoSeleccionado: number;

  displayedColumns = ['idTipoProducto','descripcion','acciones']
  dataSource: MatTableDataSource<TipoProducto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private tipoProductoService: TipoProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tipoProductoService.getTipoProductoCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.tipoProductoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Notificación', { duration: 4000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    })

    this.tipoProductoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  crear(){
    this.dialog.open(TipoProductoDialogoComponent);
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEst: number) {
    this.tipoProductoService.eliminar(idEst['idTipoProducto']).pipe(switchMap(() => {
      return this.tipoProductoService.listar();
    })).subscribe(data => {
      this.tipoProductoService.setTipoProductoCambio(data);
      this.tipoProductoService.setMensajeCambio('ELIMINADO');
    });
  }

  abrirDialogo(cppEst?: TipoProducto) {
    let aut = cppEst != null ? cppEst : new TipoProducto();
    this.dialog.open(TipoProductoDialogoComponent, {
      width: '250px',
      data: aut
    })
  }

}
