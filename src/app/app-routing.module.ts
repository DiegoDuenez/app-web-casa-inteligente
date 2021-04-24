import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormLoginComponent } from './components/form-login/form-login.component';
import {RegistroComponent } from './components/registro/registro.component'
import { MiCasaComponent } from './components/mi-casa/mi-casa.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroHabitacionComponent } from './components/registro-habitacion/registro-habitacion.component';
import { RegistroSensorComponent } from './components/registro-sensor/registro-sensor.component';
import { UsuariosVerComponent } from './components/usuarios-ver/usuarios-ver.component';
import { UsuariosCrearComponent } from './components/usuarios-crear/usuarios-crear.component';
import { InfoAreaComponent } from './components/info-area/info-area.component';
import { GestionHogarComponent } from './components/gestion-hogar/gestion-hogar.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: 'login', component: FormLoginComponent},
  {path: 'registro', component: RegistroComponent, canActivate: [AuthGuard] },
  {path: 'registro/habitacion', component: RegistroHabitacionComponent,  canActivate: [AuthGuard]},
  {path: 'registro/sensor', component: RegistroSensorComponent, canActivate: [AuthGuard]},
  {path: 'micasa', component: MiCasaComponent, canActivate: [AuthGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/lista', component: UsuariosVerComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/crear', component: UsuariosCrearComponent, canActivate: [AuthGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'informacion/area/:id', component: InfoAreaComponent, canActivate: [AuthGuard]},
  {path: 'gestion', component: GestionHogarComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
