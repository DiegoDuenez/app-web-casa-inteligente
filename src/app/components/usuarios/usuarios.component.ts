import { Component, OnInit } from '@angular/core';
import {  AuthService} from '../../services/auth/auth.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  idRol!: Number;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getPerfil()
  }

  getPerfil(){
    this.authService.getPerfil().subscribe((data:any)=>{
      this.idRol = data.rol_id
    })
  }
  

}
