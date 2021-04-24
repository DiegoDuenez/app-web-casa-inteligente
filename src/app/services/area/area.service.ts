import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../models/area'
import { Sensor } from 'src/app/models/sensor';
import { RolArea } from 'src/app/models/rol-area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

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

  get(id: Number = 0){
    if(id == 0){
      return this.httpClient.get(`${this.apiURL}/mostrar/areas`);
    }
    else{
      return this.httpClient.get(`${this.apiURL}/mostrar/areas/` + id);
    }
  }

  post(area: Area){
    return this.httpClient.post(`${this.apiURL}/crear/areas`, area)
  }

  getSensoresArea(id: Number){

    return this.httpClient.get(`${this.apiURL}/mostrar/sensores/area/` + id);

  }

  getUsersAreas(id: Number){
    return this.httpClient.get(`${this.apiURL}/mostrar/areas/usuario/` + id);
  }

  getRolesAreas(id: Number){
    return this.httpClient.get(`${this.apiURL}/mostrar/areas/rol/` + id);
  }

  update(area: Area, id: Number){
    return this.httpClient.put(`${this.apiURL}/editar/areas/` + id, area);
  }

  deleteArea(id: Number){
    return this.httpClient.delete(`${this.apiURL}/eliminar/areas/` + id);
  }
  
  postRolAreas(rolArea: RolArea){
    return this.httpClient.post(`${this.apiURL}/crear/rol/areas`, rolArea);
  }

  deleteRolAreas(idRol: Number, idArea: Number){
    return this.httpClient.delete(`${this.apiURL}/eliminar/rol/` + idRol + '/area/' + idArea);
  }
}
