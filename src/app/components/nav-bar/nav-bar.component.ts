import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  idRol!: Number;

  constructor( public authService: AuthService) { }

  

  ngOnInit(): void {
   this.getPerfil()
  }

  getPerfil(){
    this.authService.getPerfil().subscribe((data:any)=>{
      this.idRol = data.rol_id
      
    })
  }

}
