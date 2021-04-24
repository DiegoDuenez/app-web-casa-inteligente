import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import {  AreaService } from '../../services/area/area.service';
import {  AuthService} from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-habitacion',
  templateUrl: './registro-habitacion.component.html',
  styleUrls: ['./registro-habitacion.component.css']
})
export class RegistroHabitacionComponent implements OnInit {

  alert!: Boolean;
  areaForm!: FormGroup;
  area!: Area;
  idRol!: Number;
  constructor(public areaService: AreaService, public authService: AuthService, private fb: FormBuilder, private router: Router) { this.createForm()}

  ngOnInit(): void {
    this.alert = false;
    this.getPerfil()
  }

  createArea(): void {
    if (this.areaForm.invalid) {
      return Object.values(this.areaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setArea();
      this.areaService.post(this.area).subscribe(
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
      this.areaForm.get('nombre')?.invalid &&
      this.areaForm.get('nombre')?.touched
    );
  }


  createForm(): void {
    this.areaForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  setArea(): void {
    this.area = {
      id: this.areaForm.get('id')?.value,
      nombre: this.areaForm.get('nombre')?.value,
      created_at: this.areaForm.get('created_at')?.value
    };
  }

  getPerfil(){
    this.authService.getPerfil().subscribe((data:any)=>{

      this.idRol = data.rol_id

    })
  }

}
