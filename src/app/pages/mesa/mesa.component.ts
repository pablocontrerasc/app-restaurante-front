import { Component, OnInit, ViewChild } from '@angular/core';
import { Mesa } from '../../_model/mesa';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MesaService } from '../../_service/mesa.service';
import { switchMap } from 'rxjs/operators';
import { MesaDialogoComponent } from './mesa-dialogo/mesa-dialogo.component';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  mesa: Mesa;
  idMesa: number;

  displayedColumns = ['idMesa','capacidad','descripcion','acciones']
  dataSource: MatTableDataSource<Mesa>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private mesaService: MesaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.mesaService.getMesaCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.mesaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Notificación', { duration: 4000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    })

    this.mesaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  crear(){
    this.dialog.open(MesaDialogoComponent);
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEst: number) {
    this.mesaService.eliminar(idEst['idMesa']).pipe(switchMap(() => {
      return this.mesaService.listar();
    })).subscribe(data => {
      this.mesaService.setMesaCambio(data);
      this.mesaService.setMensajeCambio('ELIMINADO');
    });
  }

  abrirDialogo(cppEst?: Mesa) {
    let aut = cppEst != null ? cppEst : new Mesa();
    this.dialog.open(MesaDialogoComponent, {
      width: '250px',
      data: aut
    })
  }

}
