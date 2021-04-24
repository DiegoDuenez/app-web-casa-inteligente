import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { Sensor } from 'src/app/models/sensor';
import { SensorService } from '../../services/sensor/sensor.service';
import { AreaService  } from '../../services/area/area.service';
import {  AuthService} from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-sensor',
  templateUrl: './registro-sensor.component.html',
  styleUrls: ['./registro-sensor.component.css']
})
export class RegistroSensorComponent implements OnInit {

  alert!: Boolean;
  sensorForm!: FormGroup;
  area!: Area;
  areas!: Area[];
  sensores_tipos!: Sensor[]
  sensor_tipo!: Sensor;
  sensor!: Sensor;
  idSensorTipo!: Number;
  idRol!: Number;
  constructor(public areaService: AreaService, public authService: AuthService, public sensorService: SensorService,private fb: FormBuilder, private router: Router) { this.createForm() }

  ngOnInit(): void {
    this.alert = false;
    this.getAreas()
    this.getSensoresTipos()
    this.getPerfil()
  }

  getAreas(){
    this.areaService.get().subscribe((data: any) =>{
      this.areas = data.areas
      console.log(this.areas)
    })
  }

  getSensoresTipos(){
    this.sensorService.getTipos().subscribe((data:any) =>{
      this.sensores_tipos = data.sensores_tipos
      console.log(this.sensores_tipos)
    })
  }

  createSensor(): void {
    if (this.sensorForm.invalid) {
      return Object.values(this.sensorForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setSensor();
      this.sensorService.postRegistrado(this.sensor).subscribe(
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
      this.sensorForm.get('nombre')?.invalid &&
      this.sensorForm.get('nombre')?.touched
    );
  }


  createForm(): void {
    this.sensorForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  setSensor(): void {
    this.sensor = {
      id: this.sensorForm.get('id')?.value,
      nombre: this.sensorForm.get('nombre')?.value,
      tipo_id: this.idSensorTipo,
      created_at: this.sensorForm.get('created_at')?.value
    };
  }

  onSelectTipo(event: any){

    this.idSensorTipo = event.target.value;
    this.sensorService.getTipos(this.idSensorTipo).subscribe((data: any) => {

      //this.router.navigate(['/movimientos/vehiculo/' + this.idVehiculo])
      
     // this.sensor_tipo = data
     this.sensor_tipo = data.sensor_tipo[0]
     console.log(this.sensor_tipo.id)

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
