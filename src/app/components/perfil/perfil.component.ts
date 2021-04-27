import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre!: String;

  idRol!: Number;

  constructor( public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getPerfil().subscribe((data: any)=>{
      this.nombre = data.nombre
      this.idRol = data.rol_id
      console.log(data.rol_id)
    })
  }

}
