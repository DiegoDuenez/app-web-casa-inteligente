import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Rol } from '../../models/rol';
import { RolArea } from '../../models/rol-area';
import { Area} from '../../models/area';
import { Sensor } from '../../models/sensor';
import { AreaService } from 'src/app/services/area/area.service';
import { SensorService } from '../../services/sensor/sensor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-hogar',
  templateUrl: './gestion-hogar.component.html',
  styleUrls: ['./gestion-hogar.component.css']
})
export class GestionHogarComponent implements OnInit {

  roles!: Rol[];
  habitaciones!: Area[];
  sensores!: Sensor[];
  sensores_tipos!: Sensor[];
  sensores_registrados!: Sensor[];
  rolTable!: Boolean;
  habitacionTable!: Boolean;
  sensorTable!: Boolean;
  sensorTipos!: Boolean;
  sensorReg!: Boolean;

  area!: Area;
  sensorTipo!: Sensor;
  sensorRegistrado!: Sensor;
  rol!: Rol;
  rolArea!: RolArea;

  newRol!: Rol;

  idArea!: Number;
  nombreArea!: String;

  idSensorTipo!: Number;
  nombreSensorTipo!: String;

  idSensorReg!: Number;
  nombreSensorReg!: String;

  idRol!: Number;
  nombreRol!: String;

  habitacionForm!: FormGroup;
  sensorTipoForm!: FormGroup;
  sensorRegForm!:FormGroup;
  rolForm!: FormGroup;
  rolAgregarAreaForm!: FormGroup;
  newRolForm!: FormGroup;

  idAreaRol!:Number;
  idUserRol!: Number;

  rolesAreas!: RolArea[];

  constructor(public authService: AuthService,
     public sensorService: SensorService, 
     public areaService: AreaService,
     private fb: FormBuilder,
     private router: Router) { this.updHabitacionForm(), 
      this.updSensorTipoForm(), 
      this.updSensorRegForm(), 
      this.updRolForm(),
      this.agregarRolAreaForm(),
      this.createRolForm()
    }

  ngOnInit(): void {
    this.getPerfil()
    this.getHabitacionesRol()
  }

  getPerfil(){
    this.authService.getPerfil().subscribe((data:any)=>{
      this.idUserRol = data.rol_id
      console.log(this.idUserRol)
    })
  }

  updateHabitacion(): void {
    if (this.habitacionForm.invalid) {
      return Object.values(this.habitacionForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      
      this.setArea();
      this.areaService.update(this.area, this.idArea).subscribe(
        (data: any) => {
          //this.router.navigate(['/perfil']);
          
          console.log(data)
          this.getHabitaciones()
         
          //this.router.navigate(['/perfil']);
        },
        (error) => {
          console.log(error)
          
        }
      );
    }
  }

  get nombreValidate() {
    return (
      this.habitacionForm.get('nombre')?.invalid &&
      this.habitacionForm.get('nombre')?.touched
    );
  }

  updHabitacionForm(): void {
    this.habitacionForm = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  setArea(): void {
    this.area = {
      id: this.habitacionForm.get('id')?.value,
      nombre: this.habitacionForm.get('nombre')?.value,
      created_at: this.habitacionForm.get('created_at')?.value

    };
  }

  getRoles(){
    this.authService.getRoles().subscribe((data:any)=>{
      this.roles = data.roles
      this.habitacionTable = false;
      this.sensorTable = false;
      this.rolTable = true;
      console.log(data)
    })
  }

  getHabitaciones(){
    this.areaService.get().subscribe((data:any)=>{
      this.habitaciones = data.areas
      this.rolTable = false;
      this.sensorTable = false;
      this.habitacionTable = true;
      console.log(data)
    })
  }

  getHabitacionesRol(){
    this.areaService.get().subscribe((data:any)=>{
      this.habitaciones = data.areas
      console.log(data)
    })
  }

   getSensores(){
    this.rolTable = false;
    this.sensorTable = true;
    this.habitacionTable = false;
   }

   onSelectSensor(event: any){
    if(event.target.value == 1){
      this.sensorService.getTipos().subscribe((data:any) =>{
        this.sensores_tipos = data.sensores_tipos
        this.sensorReg = false;
        this.sensorTipos = true;
        console.log(this.sensores_tipos)
      })
    }
    else if (event.target.value == 2){
      this.sensorService.getRegistrados().subscribe((data:any)=>{
        this.sensores_registrados = data.sensores_registrados
        this.sensorTipos = false;
        this.sensorReg = true;
        console.log(this.sensores_registrados)

      })
    }
    console.log(event.target.value)
  }

  onSelectHabitacion(area: Area){
    this.idArea = area.id
    this.nombreArea = area.nombre
    this.areaService.get(area.id).subscribe((data: any)=>{
      console.log(this.idArea)
    })
  }

  
  onDeleteArea(area: Area) {
    //this.deleteEstacion = estacion;
    let index = this.habitaciones.findIndex( e => e.id == area.id);
    if(index !== -1){
      this.habitaciones.splice(index, 1);
    }
    
    this.areaService.deleteArea(area.id).subscribe(
      (data: any) => {
        console.log(data)
      },
      (error) => {
        console.log(error);
      }
    );
  }



  /* - - - - - - SENSORES TIPOS - - - - - -*/

  onSelectSensorTipo(sensor: Sensor){
    this.idSensorTipo = sensor.id
    this.nombreSensorTipo = sensor.nombre
    this.sensorService.getTipos(sensor.id).subscribe((data: any)=>{
      console.log(data)
    })
  }


  updateSensorTipo(): void {
    if (this.sensorTipoForm.invalid) {
      return Object.values(this.sensorTipoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      
      this.setSensorTipo();
      this.sensorService.updateSensorTipo(this.sensorTipo, this.idSensorTipo).subscribe((data:any)=>{
        console.log(data)
        
          this.sensorService.getTipos().subscribe((data:any) =>{
            this.sensores_tipos = data.sensores_tipos
            console.log(this.sensores_tipos)
          })
        
      })

    }
  }

  get nombreSensorTipoValidate() {
    return (
      this.sensorTipoForm.get('nombre')?.invalid &&
      this.sensorTipoForm.get('nombre')?.touched
    );
  }

  updSensorTipoForm(): void {
    this.sensorTipoForm = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  setSensorTipo(): void {
    this.sensorTipo = {
      id: this.sensorTipoForm.get('id')?.value,
      nombre: this.sensorTipoForm.get('nombre')?.value,
      created_at: this.sensorTipoForm.get('created_at')?.value,
      tipo_id: this.sensorTipoForm.get('tipo_id')?.value,
      pin_1:  this.sensorTipoForm.get('pin_1')?.value,
      pin_2: this.sensorTipoForm.get('pin_2')?.value,

    };
  }



  /* - - - - - - SENSORES REGISTRADOS - - - - - -*/

  onSelectSensorReg(sensor: Sensor){
    this.idSensorReg= sensor.id
    this.nombreSensorReg = sensor.nombre
    this.sensorService.getRegistrados(sensor.id).subscribe((data: any)=>{
      console.log(data)
    })
  }


  updateSensorReg(): void {
    if (this.sensorRegForm.invalid) {
      return Object.values(this.sensorRegForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      
      this.setSensorReg();
      this.sensorService.updateSensorReg(this.sensorRegistrado, this.idSensorReg).subscribe((data:any)=>{
        console.log(data)
        
    
          this.sensorService.getRegistrados().subscribe((data:any)=>{
            this.sensores_registrados = data.sensores_registrados
            console.log(this.sensores_registrados)
    
          })
        
      })

    }
  }

  get nombreSensorRegValidate() {
    return (
      this.sensorRegForm.get('nombre')?.invalid &&
      this.sensorRegForm.get('nombre')?.touched
    );
  }

  updSensorRegForm(): void {
    this.sensorRegForm = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  setSensorReg(): void {
    this.sensorRegistrado = {
      id: this.sensorRegForm.get('id')?.value,
      nombre: this.sensorRegForm.get('nombre')?.value,
      created_at: this.sensorRegForm.get('created_at')?.value,
      tipo_id: this.sensorRegForm.get('tipo_id')?.value,
      pin_1:  this.sensorTipoForm.get('pin_1')?.value,
      pin_2: this.sensorTipoForm.get('pin_2')?.value,

    };
  }

  onDeleteSensorReg(sensor: Sensor) {
    //this.deleteEstacion = estacion;
    let index = this.sensores_registrados.findIndex( e => e.id == sensor.id);
    if(index !== -1){
      this.sensores_registrados.splice(index, 1);
    }
    
    this.sensorService.deleteSensoresReg(sensor.id).subscribe(
      (data: any) => {
        console.log(data)
      },
      (error) => {
        console.log(error);
      }
    );
  }


  /* - - - - - ROLES - - - - - - */

  onSelectRol(rol: Rol){
    this.idRol = rol.id
    this.nombreRol = rol.nombre
    this.authService.getRoles(rol.id).subscribe((data: any)=>{
      console.log(data)
    })
  }


  updateRol(): void {
    if (this.rolForm.invalid) {
      return Object.values(this.rolForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      
      this.setRol();
      this.authService.updateRol(this.rol, this.idRol).subscribe((data:any)=>{
        console.log(data)
        
    
          this.getRoles()
        
      })

    }
  }

  get nombreRolValidate() {
    return (
      this.rolForm.get('nombre')?.invalid &&
      this.rolForm.get('nombre')?.touched
    );
  }

  updRolForm(): void {
    this.rolForm = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  setRol(): void {
    this.rol = {
      id: this.rolForm.get('id')?.value,
      nombre: this.rolForm.get('nombre')?.value

    };
  }

  

  onSelectArea(event: any){
    this.idAreaRol = event.target.value
    this.areaService.get(this.idAreaRol).subscribe((data:any)=>{
      console.log(data.area)
    })
    
  }

  getRolesAreas(rol: Rol){
    this.idRol = rol.id
    this.authService.getRoles(rol.id).subscribe((data: any)=>{
      console.log(data)
    })
    this.areaService.getRolesAreas(this.idRol).subscribe((data:any)=>{
      this.rolesAreas = data.rol_areas
      console.log(data.rol_areas)
    })

  }

  agregarRolArea(): void {
    if (this.rolAgregarAreaForm.invalid) {
      return Object.values(this.rolAgregarAreaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      
      this.setRolArea();
      this.areaService.postRolAreas(this.rolArea).subscribe((data:any)=>{
        console.log(data)
        
    
        this.areaService.getRolesAreas(this.idRol).subscribe((data:any)=>{
          this.rolesAreas = data.rol_areas
          console.log(data.rol_areas)
        })
        
      })

    }
  }
  agregarRolAreaForm(): void {
    this.rolAgregarAreaForm = this.fb.group({
      rol_id: this.idRol,
      area_id: this.idAreaRol
    });
  }

  setRolArea(): void {
    this.rolArea = {
      id: this.rolAgregarAreaForm.get('id')?.value,
      rol_id: this.idRol,
      area_id: this.idAreaRol,
      areaNombre: this.rolAgregarAreaForm.get('areaNombre')?.value,
      rolNombre: this.rolAgregarAreaForm.get('rolNombre')?.value,

    };
  }


  onDeleteAreaRol(rolArea: RolArea) {
    //this.deleteEstacion = estacion;
    let index = this.rolesAreas.findIndex( e => e.area_id == rolArea.area_id );
    if(index !== -1){
      this.rolesAreas.splice(index, 1);
    }
    
    this.areaService.deleteRolAreas(this.idRol, rolArea.area_id).subscribe(
      (data: any) => {
        console.log(data)
        this.areaService.getRolesAreas(this.idRol).subscribe((data:any)=>{
          this.rolesAreas = data.rol_areas
          console.log(data.rol_areas)
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createRol(): void {
    if (this.newRolForm.invalid) {
      return Object.values(this.newRolForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      
      this.setRolNew();
      this.authService.postRol(this.newRol).subscribe((data:any)=>{
        console.log(data)
        this.getRoles()
        
      })

    }
  }

  get nombreRolNewValidate() {
    return (
      this.newRolForm.get('nombre')?.invalid &&
      this.newRolForm.get('nombre')?.touched
    );
  }

  createRolForm(): void {
    this.newRolForm = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  setRolNew(): void {
    this.newRol = {
      id: this.newRolForm.get('id')?.value,
      nombre: this.newRolForm.get('nombre')?.value

    };
  }

  onDeleteRol(rol: Rol) {
    //this.deleteEstacion = estacion;
    let index = this.roles.findIndex( e => e.id == rol.id );
    if(index !== -1){
      this.roles.splice(index, 1);
    }
    
    this.authService.deleteRol(rol.id).subscribe(
      (data: any) => {
        console.log(data)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  



}
