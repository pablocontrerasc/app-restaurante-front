import { Component, OnInit, Inject } from '@angular/core';
import { Reserva } from '../../../_model/reserva';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { Mesa } from '../../../_model/mesa';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservaService } from '../../../_service/reserva.service';
import { MesaService } from '../../../_service/mesa.service';
import { ClienteService } from '../../../_service/cliente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reserva-dialogo',
  templateUrl: './reserva-dialogo.component.html',
  styleUrls: ['./reserva-dialogo.component.css']
})
export class ReservaDialogoComponent implements OnInit {

  reserva: Reserva;
  nombrec$: Observable<Cliente[]>;
  nombrem$: Observable<Mesa[]>;
 

  idMesaSeleccionado: number;
  idClienteSeleccionado: number;

  constructor(
    private dialogRef: MatDialogRef<ReservaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reserva,
    private reservaService: ReservaService,
    private mesaServive: MesaService,
    private clienteService: ClienteService

  ) { }

  ngOnInit(): void {
    this.nombrec$ = this.clienteService.listar();
    this.nombrem$ = this.mesaServive.listar();
   

    this.reserva = new Reserva();
    this.reserva.idReserva = this.data.idReserva;
    this.reserva.fecha =new Date().toLocaleDateString()  +' '+  new Date().toLocaleTimeString() 
   // this.orden.fecha = new Date().toISOString().slice(0,20); 
   
    
    this.reserva.idCliente = this.data.idCliente;
    this.reserva.idMesa = this.data.idMesa


    const me = new Mesa();
    me['idMesa'] = Number(this.data.idMesa);
    this.reserva.mesa = me;

    const cli = new Cliente();
    cli['idCliente'] = Number(this.data.idCliente);
    this.reserva.cliente = cli;


  }

  selected(event) {
    let target = event.source.selected._element.nativeElement;
    let selected = {
      value: event.value,
      text: target.innerText.trim()
    };
    console.log(selected.value); 
    
  
    const entm = new Mesa()
    this.idMesaSeleccionado = selected.value;
  
    entm['idMesa'] = this.idMesaSeleccionado
    this.reserva.mesa = entm;

    const entc = new Cliente()
    this.idClienteSeleccionado = selected.value;
  
    entc['idCliente'] = this.idClienteSeleccionado
    this.reserva.cliente = entc;

  }

  operar() {
    if (this.reserva != null && this.reserva.idReserva > 0) {
      //MODIFICAR
      //PRACTICA IDEAL
      this.reservaService.modificar(this.reserva).pipe(switchMap(() => {
        return this.reservaService.listar();
      })).subscribe(data => {
        this.reservaService.setReservaCambio(data);
        this.reservaService.setMensajeCambio('MODIFICADO');
      });
    } else {
      //REGISTRAR
      console.log(this.reserva);
      this.reservaService.crear(this.reserva).pipe(switchMap(() => {
        return this.reservaService.listar();
      })).subscribe(data => {
        this.reservaService.setReservaCambio(data);
        this.reservaService.setMensajeCambio('REGISTRADO');
      });
    }
    this.cerrar();
  }


  cerrar() {
    this.dialogRef.close();
  }

}


