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

  unPin!: Boolean;
  dosPin!: Boolean;

  pinRepeat!: Boolean;
  constructor(public areaService: AreaService, public authService: AuthService, public sensorService: SensorService,private fb: FormBuilder, private router: Router) { this.createForm() }

  ngOnInit(): void {
    this.alert = false;
    this.pinRepeat = false;
    this.getAreas()
    this.getSensoresTipos()
    this.getPerfil()
  }

  getAreas(){
    this.areaService.get().subscribe((data: any) =>{
      this.areas = data.areas
    
    })
  }

  getSensoresTipos(){
    this.sensorService.getTipos().subscribe((data:any) =>{
      this.sensores_tipos = data.sensores_tipos
      
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

          if(data[0].message ==  "unique validation failed on pin_1"){
            this.pinRepeat = true;
            this.alert = false;
          }
          else if(data[0].message ==  "unique validation failed on pin_2"){
            this.alert = false;
            this.pinRepeat = true;
          }
          
          
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

  get pin1Validate() {
    return (
      this.sensorForm.get('pin_1')?.invalid &&
      this.sensorForm.get('pin_1')?.touched
    );
  }

  get pin2Validate() {
    return (
      this.sensorForm.get('pin_2')?.invalid &&
      this.sensorForm.get('pin_2')?.touched
    );
  }


  

  createForm(): void {
    if(this.unPin == true){
      this.sensorForm = this.fb.group({
        nombre: ['', [Validators.required]],
        pin_1: ['', [Validators.required]],
        pin_2: ['', [Validators.nullValidator]]
        
      });
    }
    else if(this.dosPin == true){
      this.sensorForm = this.fb.group({
        nombre: ['', [Validators.required]],
        pin_1: ['', [Validators.required]],
        pin_2: ['', [Validators.required]]
        
      });
    }
    else{
      this.sensorForm = this.fb.group({
        nombre: ['', [Validators.required]],
        pin_1: ['', [Validators.nullValidator]],
        pin_2: ['', [Validators.nullValidator]]
      });
    }
    
  }

  setSensor(): void {
    this.sensor = {
      id: this.sensorForm.get('id')?.value,
      nombre: this.sensorForm.get('nombre')?.value,
      tipo_id: this.idSensorTipo,
      created_at: this.sensorForm.get('created_at')?.value,
      pin_1: this.sensorForm.get('pin_1')?.value,
      pin_2: this.sensorForm.get('pin_2')?.value
    };
  }

  onSelectTipo(event: any){

    this.idSensorTipo = event.target.value;
    this.sensorService.getTipos(this.idSensorTipo).subscribe((data: any) => {

      //this.router.navigate(['/movimientos/vehiculo/' + this.idVehiculo])
      
     // this.sensor_tipo = data
     this.sensor_tipo = data.sensor_tipo[0]
     if(this.sensor_tipo.nombre == "pir" || this.sensor_tipo.nombre == "led" || this.sensor_tipo.nombre == "humedad" || this.sensor_tipo.nombre == "temperatura"){
       this.unPin = true;
       this.dosPin = false;
     }
     else{
      this.unPin = true;
      this.dosPin = true;
     }


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
