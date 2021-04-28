import { Component, OnInit } from "@angular/core";
//import Ws from '@adonisjs/websocket-client';
//import Ws from "@adonisjs/websocket-client";
//const Ws = require('@adonisjs/websocket-client');
//import { interval } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  //title = "Sockets-Client";
  
  chat: any;
  messages: string[] = [];
  text!: string;
 
  //historial = [];

  
  ngOnInit() : void{
   // const secondsCounter = interval(1000);

   /* secondsCounter.subscribe(n =>
      console.log(`It's been ${n} seconds since subscribing!`)
    );*/
    /*const ws = Ws("ws://192.168.1.68", {
    path: "ws"})

    ws.connect()*/

    /*this.chat = ws.subscribe("prueba");
  
    console.log(this.chat)
    
    this.chat.on("message", (data: any) => {
     this.messages.push(data);

    });*/

   /* this.chat = ws.subscribe("prueba");
    this.chat.on("message", (data: any) => {
      console.log("historial",data)
      this.messages.push(data)
 
     });*/
    
  }
/*
  sendMessage(): void {
    this.chat.emit("message", this.text);
   this.messages.push(this.text);
   //this.datam.push(this.data)
    this.text = "";
  }*/

/* sendCall() {
    this.chat.emit("message", {
        sensor: this.text,
        pir: 1
    });

    this.messages.push(this.text);
}*/

/*sendSensor(){
  this.chat.emit("message", {
    nombreSensor: this.text
  });

}*/
  
  /*ngOnInit(): void {
    /*this.ws = Ws("ws://127.0.0.1:3333", {
      path: "ws"
    });*/
    /*const ws = Ws("ws://127.0.0.1:3333", {
    path: "adonis-ws"
  })
    //ws.connect()
    
    //this.chat = this.ws.subscribe("chat");
    /*const chat = ws.subscribe("chat")
    console.log(chat)
    chat.on("message", (data: any) => {
      this.messages.push(data);
    });
    
  }*/

  /*sendMessage(): void {
    //this.chat.emit("message", this.text);
    this.messages.push(this.text);
    this.text = "";
    
  }*/
}