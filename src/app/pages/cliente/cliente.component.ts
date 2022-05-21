import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ClienteService } from '../../_service/cliente.service';
import { Cliente } from 'src/app/_model/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  displayedColumns = ['idCliente', 'nombre', 'apellido', 'correo', 'telefono','estado', 'acciones'];
  dataSource: MatTableDataSource<Cliente>;
  @ViewChild(MatSort) sort: MatSort; 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.clienteService.getClienteCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.clienteService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'AVISO', { duration: 2000});
    })

    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  } 

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idCliente: number){
    this.clienteService.eliminar(idCliente).pipe(switchMap(()=>{
    return this.clienteService.listar()
    })).subscribe(data => {
      this.clienteService.setClienteCambio(data);
      this.clienteService.setMensajeCambio('Se eliminó')
    })
  }

}
