import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import {  AreaService } from '../../services/area/area.service';
import {AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-mi-casa',
  templateUrl: './mi-casa.component.html',
  styleUrls: ['./mi-casa.component.css']
})
export class MiCasaComponent implements OnInit {

  idArea!: Number;
  areas!: Area[];

  idUser!: Number;

  title = 'app';
  elementType = NgxQrcodeElementTypes.IMG;
  value!: any;

  constructor(public areaService: AreaService, public authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.getAreas()
    this.getUserAreas()
  }

  getAreas(){
    this.areaService.get().subscribe((data: any) =>{
      //this.areas = data.areas
      //console.log(this.areas)
    })
  }


  getUserAreas(){
    this.authService.getPerfil().subscribe((data: any)=>{
      this.idUser = data.id
     
      this.areaService.getUsersAreas(this.idUser).subscribe((data:any)=>{
        this.areas = data.usuario_areas
        
      })
    })
  }

  onSelectAreaInfo(area: Area){

  this.idArea = area.id
    this.areaService.get(this.idArea).subscribe((data:any)=>{
      this.router.navigate(['/informacion/area/' + this.idArea]);
     
    })

  }
}
