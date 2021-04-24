import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarTopShComponent } from './components/nav-bar-top-sh/nav-bar-top-sh.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MiCasaComponent } from './components/mi-casa/mi-casa.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroHabitacionComponent } from './components/registro-habitacion/registro-habitacion.component';
import { RegistroSensorComponent } from './components/registro-sensor/registro-sensor.component';
import { UsuariosVerComponent } from './components/usuarios-ver/usuarios-ver.component';
import { UsuariosCrearComponent } from './components/usuarios-crear/usuarios-crear.component';
import { AuthGuard } from './guards/auth.guard';

import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { InfoAreaComponent } from './components/info-area/info-area.component';
import { GestionHogarComponent } from './components/gestion-hogar/gestion-hogar.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    NavBarComponent,
    NavBarTopShComponent,
    RegistroComponent,
    MiCasaComponent,
    UsuariosComponent,
    PerfilComponent,
    RegistroHabitacionComponent,
    RegistroSensorComponent,
    UsuariosVerComponent,
    UsuariosCrearComponent,
    InfoAreaComponent,
    GestionHogarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  },
  AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
