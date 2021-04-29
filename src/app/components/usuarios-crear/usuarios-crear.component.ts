import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Rol } from '../../models/rol';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';


@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.css']
})
export class UsuariosCrearComponent implements OnInit {

  alert!: Boolean;
  alertModalQR!: Boolean;
  user!: User;
  roles!: Rol[];
  userForm!: FormGroup;
  idRol!: Number;
  idRolSelect!: Number;

  title = 'app';
  elementType = NgxQrcodeElementTypes.IMG;
  value!: any;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  /*idNewUser!: Number;
  nombreNewUser!: String;
  value = {id: this.idNewUser, nombre: this.nombreNewUser};*/

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
          /*if (data[0].message){
            this.alertModalQR = false;
          }
          else{
            console.log(data)
            this.alertModalQR = true;
            this.value = this.user.nombre;
          }*/

          this.alertModalQR = true;
          this.value = this.user.nombre;
          /*this.value.id = this.user.id;
          this.value.nombre = this.user.nombre;*/

          
          
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

  get emailValidate() {
    return (
      this.userForm.get('email')?.invalid &&
      this.userForm.get('email')?.touched
    );
  }

  get passwordValidate() {
    return (
      this.userForm.get('password')?.invalid &&
      this.userForm.get('password')?.touched
    );
  }

  get rolValidate(){
    return(
      this.userForm.get('rol_id')?.invalid &&
      this.userForm.get('rol_id')?.touched
    );
  }

  createForm(): void {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rol_id: ['', [Validators.required]]
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
