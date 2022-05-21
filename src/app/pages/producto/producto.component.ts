import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Producto } from '../../_model/producto';
import { ProductoService } from '../../_service/producto.service';
import { TipoProducto } from '../../_model/tipoProducto';
import { ProductoDialogoComponent } from './producto-dialogo/producto-dialogo.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: Producto;
  idProducto: number;
  idTipoSeleccionado: number;

  displayedColumns = ['idProducto','nombre','precio','tiempoPreparacion', 'tipoproducto', 'acciones']
  dataSource: MatTableDataSource<Producto>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productoService.getProductoCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Notificación', { duration: 4000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    })

    this.productoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  crear(){
    this.dialog.open(ProductoDialogoComponent);
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEst: number) {
    this.productoService.eliminar(idEst['idProducto']).pipe(switchMap(() => {
      return this.productoService.listar();
    })).subscribe(data => {
     // this.productoService.setFormaPagoCambio(data);
      this.productoService.setMensajeCambio('ELIMINADO');
    });
  }

  editarDialogo(row: any){
    let tipo = new TipoProducto();
    tipo.idTipoProducto = row.tipo.idTipoProducto

    this.producto = new Producto();
    this.producto.nombre = row.producto.nombre
    this.producto.precio = row.producto.precio
    this.producto.tiempoPreparacion = row.producto.tiempoPreparacion
    //this.producto.valorTotalProducto = row.producto.valorTotalProducto
    this.producto.idTipo = this.idTipoSeleccionado
    //this.producto.editing = true

    this.dialog.open(ProductoDialogoComponent, {
      data: this.producto
    })
  }

  abrirDialogo(cppEst?: Producto) {
    let aut = cppEst != null ? cppEst : new Producto();
    this.dialog.open(ProductoDialogoComponent, {
      width: '250px',
      data: aut
    })
  }

}

