import { Component, OnInit } from "@angular/core";
//import Ws from '@adonisjs/websocket-client';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  //title = "Sockets-Client";
  
  //chat: any;
  //messages: string[] = [];
  //text!: string;

  ngOnInit() : void{
    
  }
  
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