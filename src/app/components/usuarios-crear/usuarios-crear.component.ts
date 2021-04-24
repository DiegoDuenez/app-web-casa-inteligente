import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Rol } from '../../models/rol';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.css']
})
export class UsuariosCrearComponent implements OnInit {

  alert!: Boolean;
  user!: User;
  roles!: Rol[];
  userForm!: FormGroup;
  idRol!: Number;
  idRolSelect!: Number;

  constructor(public authService: AuthService,private fb: FormBuilder, private router: Router) { this.createForm() }

  ngOnInit(): void {
    this.getRoles()
    this.getPerfil()
    this.alert = false;
  }

  getRoles(){
    this.authService.getRoles().subscribe((data:any)=>{
      this.roles = data.roles
      console.log(data)
    })
  }

  

  createUser(): void {
    if (this.userForm.invalid) {
      return Object.values(this.userForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setUser();
      this.authService.postUser(this.user).subscribe(
        (data: any) => {
          //this.router.navigate(['/perfil']);
          this.alert = true;
          console.log(data)
          
          
        },
        (error) => {
          console.log(error)
          
        }
      );
    }
  }

  get nombreValidate() {
    return (
      this.userForm.get('nombre')?.invalid &&
      this.userForm.get('nombre')?.touched
    );
  }

  createForm(): void {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  setUser(): void {
    this.user = {
      id: this.userForm.get('id')?.value,
      nombre: this.userForm.get('nombre')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      rol_id: this.idRolSelect,
      rol_nombre: this.userForm.get('rol_nombre')?.value,
    };
  }

  onSelectRol(event: any){

    this.idRolSelect = event.target.value
    this.authService.getRoles(event.target.value).subscribe((data: any) => {

     // this.router.navigate(['/usuarios/crear'])
      
     // this.sensor_tipo = data
     /*this.sensor_tipo = data.sensor_tipo[0]
     console.log(this.sensor_tipo.id)
     console.log(data)
     console.log(data)*/

    }, error =>{
      console.log(error)

    });

  }

  getPerfil(){
    this.authService.getPerfil().subscribe((data:any)=>{
      this.idRol = data.rol_id
    })
  }
  


}
