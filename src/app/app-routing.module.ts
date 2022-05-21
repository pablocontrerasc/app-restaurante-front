import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EdicionComponent } from './pages/cliente/edicion/edicion.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { TipoProductoComponent } from './pages/tipo-producto/tipo-producto.component';
import { LocalComponent } from './pages/local/local.component';
import { MesaComponent } from './pages/mesa/mesa.component';
import { OrdenComponent } from './pages/orden/orden.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { Not403Component } from './pages/not403/not403.component';
import { ReservaComponent } from './pages/reserva/reserva.component';

const routes: Routes = [
  { path: 'cliente', component: ClienteComponent, children:[ 
     {path: 'nuevo', component: EdicionComponent},
     {path: 'edicion/:id', component: EdicionComponent}
  ]
  },
  { path: 'tipo-producto', component: TipoProductoComponent},
  { path: 'producto', component: ProductoComponent},
  { path: 'local', component: LocalComponent},
  { path: 'mesa', component: MesaComponent},
  { path: 'orden', component: OrdenComponent},
  { path: 'reserva', component: ReservaComponent},
  { path: 'login', component: LoginComponent},

    { path: 'not-403', component: Not403Component },
 // { path: '', component: OrdenComponent}
 { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration:'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
