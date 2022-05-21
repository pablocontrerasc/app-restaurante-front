import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TipoProductoComponent } from './pages/tipo-producto/tipo-producto.component';
import { EdicionComponent } from './pages/cliente/edicion/edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoDialogoComponent } from './pages/producto/producto-dialogo/producto-dialogo.component';

import { TipoProductoDialogoComponent } from './pages/tipo-producto/tipo-producto-dialogo/tipo-producto-dialogo.component';
import { LocalComponent } from './pages/local/local.component';
import { LocalDialogoComponent } from './pages/local/local-dialogo/local-dialogo.component';
import { MesaComponent } from './pages/mesa/mesa.component';
import { MesaDialogoComponent } from './pages/mesa/mesa-dialogo/mesa-dialogo.component';
import { OrdenComponent } from './pages/orden/orden.component';
import { OrdenDialogoComponent } from './pages/orden/orden-dialogo/orden-dialogo.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { ServerErrorsInterceptor } from './pages/shared/server-errors.interceptor';
import { Not403Component } from './pages/not403/not403.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ReservaDialogoComponent } from './pages/reserva/reserva-dialogo/reserva-dialogo.component';


export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    TipoProductoComponent,
    EdicionComponent,
    ProductoComponent,
    ProductoDialogoComponent,
    TipoProductoDialogoComponent,
    LocalComponent,
    LocalDialogoComponent,
    MesaComponent,
    MesaDialogoComponent,
    OrdenComponent,
    OrdenDialogoComponent,
    LoginComponent,
    RecuperarComponent,
    TokenComponent,
    Not403Component,
    ReservaComponent,
    ReservaDialogoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/login/enviarCorreo`],
      },
  
    }),
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
