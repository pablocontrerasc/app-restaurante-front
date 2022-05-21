import { Mesa } from './mesa';
import { Cliente } from './cliente';
export class  Reserva{
    idReserva : number;
    fecha : String;

    mesa : Mesa;
    idMesa: number;

    cliente: Cliente;
    idCliente: number;

}