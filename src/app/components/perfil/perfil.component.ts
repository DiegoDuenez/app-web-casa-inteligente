import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { interval, Observable } from "rxjs";
import { Notificacion } from '../../models/notificacion';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre!: String;

  idRol!: Number;

  secondsCounter!: Observable<Number>

  notificaciones!: Notificacion[];

  cantidad!: number;

  constructor( public authService: AuthService, public notService: NotificacionService) { }

  ngOnInit(): void {
    this.secondsCounter = interval(1000);

    this.authService.getPerfil().subscribe((data: any)=>{
      this.nombre = data.nombre
      this.idRol = data.rol_id
    })

    /*this.notService.getCantidad().subscribe((data:any)=>{
      console.log(data)
    })*/

    this.getNotificaciones()
    
  }

  getNotificaciones(){
    this.secondsCounter.subscribe(n =>
      this.notService.get().subscribe((data:any)=>{
        this.notificaciones = data.data;
        this.cantidad = this.notificaciones.length 
      })
    );
   
  }

  onDeleteNotificacion(n: Notificacion) {
    //this.deleteEstacion = estacion;
    let index = this.notificaciones.findIndex( e => e.nombre_autor == n.nombre_autor );
    if(index !== -1){
      this.notificaciones.splice(index, 1);
    }
    this.notService.delete(n.nombre_autor).subscribe(
      (data: any) => {
      
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
