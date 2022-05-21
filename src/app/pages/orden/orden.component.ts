import { Component, OnInit, ViewChild } from '@angular/core';
import { Orden } from '../../_model/orden';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { OrdenService } from '../../_service/orden.service';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { OrdenDialogoComponent } from './orden-dialogo/orden-dialogo.component';
import { Cliente } from '../../_model/cliente';
import { Mesa } from '../../_model/mesa';
import { Producto } from '../../_model/producto';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  orden: Orden;
  idOrden: number;
  idProducto: number;
  idMesa: number;
  idCliente: number;
  idClienteSeleccionado: number;
  idMesaSeleccionado : number;
  idProductoSeleccionado: number;

  displayedColumns = ['idOrden','fecha','producto','mesa', 'cliente', 'confirmacion','acciones']
  dataSource: MatTableDataSource<Orden>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private ordenService: OrdenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ordenService.getOrdenCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.ordenService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Notificación', { duration: 4000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    })

    this.ordenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  crear(){
    this.dialog.open(OrdenDialogoComponent);
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEst: number) {
    this.ordenService.eliminar(idEst['idOrden']).pipe(switchMap(() => {
      return this.ordenService.listar();
    })).subscribe(data => {
    
      this.ordenService.setMensajeCambio('ELIMINADO');
    });
  }

  editarDialogo(row: any){
    let cliente = new Cliente();
    cliente.idCliente = row.cliente.idCliente

    let mesa = new Mesa();
    mesa.idMesa = row.mesa.idMesa

    let producto = new Producto();
    producto.idProducto = row.producto.idProducto

    this.orden = new Orden();
    this.orden.confirmacion = row.orden.confirmacion
    this.orden.fecha = row.orden.fecha
    this.orden.idCliente = this.idClienteSeleccionado;
    this.orden.idMesa = this.idMesaSeleccionado;
    this.orden.idProducto = this.idProductoSeleccionado;


    this.dialog.open(OrdenDialogoComponent, {
      data: this.orden
    })
  }

  abrirDialogo(cppEst?: Orden) {
    let aut = cppEst != null ? cppEst : new Orden();
    this.dialog.open(OrdenDialogoComponent, {
      width: '250px',
      data: aut
    })
  }

}

