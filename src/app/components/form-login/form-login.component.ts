import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../models/user';
import {webSocket } from 'rxjs/webSocket';
import Ws from '@adonisjs/websocket-client';


//var Ws = require('@adonisjs/websocket-client');


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  loginForm!: FormGroup;
  solicitaForm!: FormGroup;
  user!: User;
  spinner: Boolean = false;

  sendNotificacion: Boolean = false;

  
  
  message = ""
  channel!: any;
  messages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
    this.solicitarForm();
  }
  ngOnInit(): void {
    const ws = Ws("ws://192.168.1.68", {
    path: "ws"})

    ws.connect()

    this.channel = ws.subscribe("notificaciones");
  
    console.log(this.channel)
    
    this.channel.on("message", (data: any) => {
     this.messages.push(data);

    });

  }

  sendCall() {
    this.channel.emit("message", {
        nombre_autor: this.message,
        titulo: "PETICIÓN DE REGISTRO",
        contenido: "unirse al hogas"
    });

    this.messages.push(this.message);
}

  login(): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.spinner = true;
      this.setUser();
      this.authService.login(this.user).subscribe(
        (data: any) => {
          //this.router.navigate(['/perfil']);
          
          const token = data.token.token;
          localStorage.setItem('token', token);
          this.router.navigate(['/perfil']);
          this.spinner = false;
          
        },
        (error) => {
          console.log(error)
          
        }
      );
    }
  }

  get emailValidate() {
    return (
      this.loginForm.get('email')?.invalid &&
      this.loginForm.get('email')?.touched
    );
  }

  get passwordValidate() {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  setUser(): void {
    this.user = {
      id: this.loginForm.get('id')?.value,
      nombre: this.loginForm.get('nombre')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      rol_id: this.loginForm.get('rol_id')?.value,
      rol_nombre: this.loginForm.get('rol_nombre')?.value,

    };
  }



  sendSocket(): void {
    if (this.solicitaForm.invalid) {
      return Object.values(this.solicitaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.sendNotificacion = true;
      this.channel.emit("message", {
        nombre_autor: this.solicitaForm.get('nombre_autor')?.value,
        titulo: "PETICIÓN DE REGISTRO",
        contenido: "unirse al hogar"
    });

    this.messages.push(this.message);
      
    }
  }

  get nombreAutorValidate() {
    return (
      this.solicitaForm.get('nombre_autor')?.invalid &&
      this.solicitaForm.get('nombre_autor')?.touched
    );
  }


  solicitarForm(): void {
    this.solicitaForm = this.fb.group({
      nombre_autor: ['', [Validators.required]]
    });
  }

  

}
