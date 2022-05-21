import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClienteService } from 'src/app/_service/cliente.service';
import { Cliente } from 'src/app/_model/cliente';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

    ngOnInit(): void {
      this.form = new FormGroup({
        'id': new FormControl(0),
        'nombre': new FormControl(''),
        'apellido': new FormControl(''),
        'correo': new FormControl(''),
        'telefono': new FormControl(''),
        'estado': new FormControl('true')
      });
  
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.initForm();
      });
  
    }
  
    private initForm() {
      if (this.edicion) {
  
        this.clienteService.listarPorId(this.id).subscribe(data => {
          this.form = new FormGroup({
            'id': new FormControl(data.idCliente),
            'nombre': new FormControl(data.nombre),
            'apellido': new FormControl(data.apellido),
            'correo': new FormControl(data.correo),
            'telefono': new FormControl(data.telefono),
            'estado': new FormControl(data.estado),
          });
  
        });
      }
    }

    operar(){
      let cliente= new Cliente();
      cliente.idCliente = this.form.value['id'];
      cliente.nombre = this.form.value['nombre'];
      cliente.apellido = this.form.value['apellido'];
      cliente.correo = this.form.value['correo'];
      cliente.telefono = this.form.value['telefono'];
      cliente.estado = this.form.value['estado'];
      
      if(this.edicion){
        // this.clienteService.modificar(cliente).subscribe(()=>{
        //   this.clienteService.listar().subscribe( data =>{
        //    // this.clienteService.clienteCambio.next(data);
        //    this.clienteService.setClienteCambio(data);
        //   });
        // });
        this.clienteService.modificar(cliente).pipe(switchMap(()=>{
          return this.clienteService.listar();
        })).subscribe(data => {
          this.clienteService.setClienteCambio(data);
          this.clienteService.setMensajeCambio('Se madificó')
        })

      }else{
        this.clienteService.registrar(cliente).subscribe(()=>{
          this.clienteService.listar().subscribe(data => {
            //this.clienteService.clienteCambio.next(data);
            this.clienteService.setClienteCambio(data);
            this.clienteService.setMensajeCambio('Se registró')
          });
        });
      }
    this.router.navigate(['cliente'])
    }
  
  }
  
