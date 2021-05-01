import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-usuarios-ver',
  templateUrl: './usuarios-ver.component.html',
  styleUrls: ['./usuarios-ver.component.css']
})
export class UsuariosVerComponent implements OnInit {

  usuarios!: User[];
  idRol!: Number;
  idUser!: Number;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getUsuarios()
    this.getPerfil()
  }

  getUsuarios(){
    this.authService.getUsuarios().subscribe((data: any) =>{
      this.usuarios = data.usuarios
      
    })
  }

  getPerfil(){
    this.authService.getPerfil().subscribe((data:any)=>{
      this.idUser = data.id
      this.idRol = data.rol_id
    })
  }

  onDeleteUser(user: User) {
    // this.deleteEstacion = estacion;
     let index = this.usuarios.findIndex( e => e.id == user.id);
     if(index !== -1){
       this.usuarios.splice(index, 1);
     }
     
     this.authService.deleteUser(user.id).subscribe(
       (data: any) => {
       },
       (error) => {
         console.log(error);
       }
     );
   }

  

}
