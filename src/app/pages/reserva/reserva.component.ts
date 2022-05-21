import { Component, OnInit, ViewChild } from '@angular/core';
import { Reserva } from '../../_model/reserva';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ReservaService } from '../../_service/reserva.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservaDialogoComponent } from './reserva-dialogo/reserva-dialogo.component';
import { switchMap } from 'rxjs/operators';
import { Cliente } from '../../_model/cliente';
import { Mesa } from '../../_model/mesa';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reserva: Reserva;
  idReserva: number;
  idMesa: number;
  idCliente: number;
  idClienteSeleccionado: number;
  idMesaSeleccionado : number;

  displayedColumns = ['idReserva','fecha','mesa','cliente','acciones']
  dataSource: MatTableDataSource<Reserva>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private reservaService: ReservaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reservaService.getReservaCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.reservaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Notificación', { duration: 4000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    })

    this.reservaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  crear(){
    this.dialog.open(ReservaDialogoComponent);
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEst: number) {
    this.reservaService.eliminar(idEst['idOrden']).pipe(switchMap(() => {
      return this.reservaService.listar();
    })).subscribe(data => {
    
      this.reservaService.setMensajeCambio('ELIMINADO');
    });
  }

  editarDialogo(row: any){
    let cliente = new Cliente();
    cliente.idCliente = row.cliente.idCliente

    let mesa = new Mesa();
    mesa.idMesa = row.mesa.idMesa


    this.reserva = new Reserva();
    this.reserva.fecha = row.orden.fecha
    this.reserva.idCliente = this.idClienteSeleccionado;
    this.reserva.idMesa = this.idMesaSeleccionado;
 


    this.dialog.open(ReservaDialogoComponent, {
      data: this.reserva
    })
  }

  abrirDialogo(cppEst?: Reserva) {
    let aut = cppEst != null ? cppEst : new Reserva();
    this.dialog.open(ReservaDialogoComponent, {
      width: '250px',
      data: aut
    })
  }

}

