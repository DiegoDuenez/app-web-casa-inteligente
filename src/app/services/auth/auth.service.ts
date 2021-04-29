import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from '../../models/user'
import { Rol } from 'src/app/models/rol';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  httpheaders: HttpHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.httpheaders.append('Content-Type', 'aplication/json');
    this.httpheaders.append(
      'Authorization',
      'Bearer' + localStorage.getItem('token')
    );
  }

  login(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/login`, user);
  }

  loggedIn(){
    return !!
    localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    return this.httpClient.delete(`${this.apiURL}logout`)
  }

  getUsuarios(id: Number = 0){
    if(id == 0){
      return this.httpClient.get(`${this.apiURL}/mostrar/usuarios`)
    }
    else{
      return this.httpClient.get(`${this.apiURL}/mostrar/usuarios/` + id )
    }

  }

  getPerfil(){
    return this.httpClient.get(`${this.apiURL}/mostrar/perfil`)
  }

  getRoles(id: Number = 0){
    if(id == 0){
      return this.httpClient.get(`${this.apiURL}/mostrar/roles`)
    }
    else{
      return this.httpClient.get(`${this.apiURL}/mostrar/roles/` + id)
    }
  }

  postRol(rol: Rol){
    return this.httpClient.post(`${this.apiURL}/crear/roles`,rol)
  }

  postUser(user: User){
    return this.httpClient.post(`${this.apiURL}/registro`, user)
  }

  deleteUser(id: Number){
    return this.httpClient.delete(`${this.apiURL}/eliminar/usuario/` + id)
  }

  updateRol(rol: Rol ,id: Number){
    return this.httpClient.put(`${this.apiURL}/editar/rol/` + id, rol)
  }

  deleteRol(id: Number){
    return this.httpClient.delete(`${this.apiURL}/eliminar/rol/` + id)
  }



}
