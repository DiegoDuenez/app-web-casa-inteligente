import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { Sensor } from 'src/app/models/sensor';
import {SensorArea} from 'src/app/models/sensor-area';
import {HistorialSensor} from 'src/app/models/historial-sensor';
import { AreaService } from '../../services/area/area.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from 'src/app/services/sensor/sensor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-area',
  templateUrl: './info-area.component.html',
  styleUrls: ['./info-area.component.css']
})
export class InfoAreaComponent implements OnInit {

  idRol!: Number;
  idAreaParam!: Number;
  idSensorRegistrado!:Number;
  areaNombre!: String;
  sensores!: SensorArea[];
  sensoresRegistrados!: Sensor[];
  sensorRegistrado!: Sensor;
  sensorArea!: SensorArea;
  sensorAreaForm!: FormGroup;
  idUser!: Number;
  areas!: Area[];
  area!: Area;
  x!: any;
  historial!: HistorialSensor[];
  sensorNombre!: String;
  idSensorHistorial!: Number;

  alert: Boolean = true;

  constructor( public areaService: AreaService, 
    public authService: AuthService,
    public sensorService: SensorService, private route: ActivatedRoute,
     private fb: FormBuilder, private router: Router) { this.createForm() }

  ngOnInit(): void {
    this.idAreaParam = this.route.snapshot.params['id'];
    this.x = this.idAreaParam
    this.areaService.get(this.idAreaParam).subscribe((data: any)=>{
      this.areaNombre = data.area.nombre
      console.log(this.areaNombre)
    })

    this.getPerfil()

    this.getSensoresArea()

    this.getSensoresRegistrados()

    this.getUserAreas()
    

    
  }

  getHistorial(){
   //  this.sensorService.getHistorialSensor
  }

  getSensoresRegistrados(){
    this.sensorService.getRegistrados().subscribe((data:any)=>{
      this.sensoresRegistrados = data.sensores_registrados
      console.log(this.sensoresRegistrados)
    })
  }

  getSensoresArea(){
    this.areaService.getSensoresArea(this.idAreaParam).subscribe((data:any)=>{
      this.sensores = data.sensores_area
      console.log(data.sensores_area)
      
    })
  }

  onSelectSensorRegistrado(event: any){

    this.idSensorRegistrado = event.target.value;
    this.sensorService.getRegistrados(this.idSensorRegistrado).subscribe((data: any) => {
     console.log(this.idAreaParam)
     this.sensorRegistrado = data.sensor_registrado[0]
     console.log(this.sensorRegistrado.id)

    }, error =>{
      console.log(error)

    });

  }

  createSensorArea(): void {
    if (this.sensorAreaForm.invalid) {
      return Object.values(this.sensorAreaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setSensorArea();
      this.sensorService.postSensorArea(this.sensorArea).subscribe(
        (data: any) => {
         this.getSensoresArea()
          console.log("agregado", data)
        },
        (error) => {
          console.log(error)
          
        }
      );
    }
  }


  createForm(): void {
    this.sensorAreaForm = this.fb.group({
      sensor_id: ['', [Validators.required]],
    });
  }

  setSensorArea(): void {
    this.sensorArea = {
      id: this.sensorAreaForm.get('id')?.value,
      sensor_id: this.idSensorRegistrado,
      sensor_nombre: this.sensorAreaForm.get('sensor_nombre')?.value,
      area_id: this.idAreaParam,
      area_nombre: this.sensorAreaForm.get('area_nombre')?.value,
      created_at: this.sensorAreaForm.get('created_at')?.value
    };
  }

  getPerfil(){
    this.authService.getPerfil().subscribe((data:any)=>{
      this.idRol = data.rol_id
    })
  }

  getUserAreas(){
    this.authService.getPerfil().subscribe((data: any)=>{
      this.idUser = data.id
      console.log(this.idUser)
      this.areaService.getUsersAreas(this.idUser).subscribe((data:any)=>{
        this.areas = data.usuario_areas
        console.log(this.areas)

        for(var i = 0; i < this.areas.length; i++){
          console.log(this.areas[i])
          if(this.x == this.areas[i].id){
            console.log("acceso")
            this.alert = false;

          }
          
        }
      })
    })

    
  }

  onSelectHistorial(sensor: SensorArea){
    this.idSensorHistorial = sensor.sensor_id;
    this.sensorService.getHistorialSensor(sensor.sensor_id).subscribe((data:any)=>{
      this.historial = data.historial
      this.sensorNombre = sensor.sensor_nombre
      console.log(this.historial)
    })

  }

  refreshDataHistorial(){
    this.sensorService.getHistorialSensor(this.idSensorHistorial).subscribe((data:any)=>{
      console.log(this.historial)
    })
  }
  
  onDeleteSensorArea(sensor: SensorArea) {
   // this.deleteEstacion = estacion;
    let index = this.sensores.findIndex( e => e.id == sensor.id);
    if(index !== -1){
      this.sensores.splice(index, 1);
    }
    
    this.sensorService.deleteSensoresAreas(sensor.id).subscribe(
      (data: any) => {
        console.log("endpoint ", data)
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
