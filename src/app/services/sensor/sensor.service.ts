import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { Sensor } from '../../models/sensor'
import { Area } from 'src/app/models/area';
import { HistorialSensor } from 'src/app/models/historial-sensor';
import { SensorArea } from 'src/app/models/sensor-area';
import { SensorTipo } from 'src/app/models/sensor-tipo';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

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

  getTipos(id: Number = 0){
    if(id == 0){
      return this.httpClient.get(`${this.apiURL}/mostrar/sensores/tipos`);
    }
    else{
      return this.httpClient.get(`${this.apiURL}/mostrar/sensores/tipos/` + id);
    }
  }

  getHistorialSensor(id: Number){
    return this.httpClient.get(`${this.apiURL}/mostrar/historial/sensor/`+ id);
  }

  getRegistrados(id: Number = 0){
    if(id == 0){
      return this.httpClient.get(`${this.apiURL}/mostrar/sensores/registrados`);
    }
    else{
      return this.httpClient.get(`${this.apiURL}/mostrar/sensores/registrados/` + id);
    }
  }

  postRegistrado(sensor: Sensor){
    return this.httpClient.post(`${this.apiURL}/crear/sensor/registrado`, sensor)
  }

  postSensorArea(sensorArea: SensorArea){
    return this.httpClient.post(`${this.apiURL}/crear/sensor/area`,sensorArea)
  }

  updateSensorTipo(sensor: Sensor, id: Number){
    return this.httpClient.put(`${this.apiURL}/editar/sensor/tipo/` + id, sensor);
  }

  updateSensorReg(sensor: Sensor, id: Number){
    return this.httpClient.put(`${this.apiURL}/editar/sensor/registrado/` + id, sensor);
  }


  deleteSensoresAreas(id: Number){
    return this.httpClient.delete(`${this.apiURL}/eliminar/area/sensor/` + id)
  }

  deleteSensoresReg(id: Number){
    return this.httpClient.delete(`${this.apiURL}/eliminar/sensor/registrado/` + id)
  }

  getHistorialMongo(data: any){
    return this.httpClient.post(`${this.apiURL}/crear/historial/sensores/`, data);
  }

  postSensorTipo(sensorTipo: SensorTipo){
    return this.httpClient.post(`${this.apiURL}/crear/sensor/tipo`, sensorTipo);
  }
  

 

}
