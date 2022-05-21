import { Mesa } from './mesa';
import { Cliente } from './cliente';
import { Producto } from './producto';
export class Orden{
    idOrden : number;
    fecha : String;
    confirmacion: Boolean;

    mesa : Mesa;
    idMesa: number;

    cliente: Cliente;
    idCliente: number;

    producto: Producto;
    idProducto: number;
    
}