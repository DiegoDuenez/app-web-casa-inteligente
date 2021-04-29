import { Injectable } from '@angular/core';
import { Notificacion } from '../../models/notificacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

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

  get(){
    return this.httpClient.get(`${this.apiURL}/mostrar/notificaciones`)
  }

  getCantidad(){
    return this.httpClient.get(`${this.apiURL}/mostrar/cantidad/notificaciones`)
  }


}
