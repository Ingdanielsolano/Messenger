import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as io from "socket.io-client";


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  public socket;
  public socketHost;
  user: string;  
  session = {
    sender: '',
    addressee:''
  }
  mes:any="";
  mensajes: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    storage.get('user').then((val) => {
      
      this.session.sender=this.navParams.get('senderr');
      this.session.addressee=this.navParams.get('addres');
      console.log(this.navParams.get('senderr'));
      console.log(this.navParams.get('addres'));     
    }).then(()=>{
      console.log(this.session)
      this.socketProccess();
    });                    
  }

  socketProccess() {
    this.socketHost = "http://localhost:8081";
    this.socket = io(this.socketHost);
    this.socket.emit('chatting', this.session);
    this.socket.on('chats', data => {
      this.mensajes = data;
      console.log("Mensajes")
      console.log(this.mensajes);      
    });    
  }
  Enviar(){
    let pay={
      sender:'',
      addressee:'',
      bodytext:''
    }
    pay.sender=this.session.sender;
    pay.addressee=this.session.addressee;
    pay.bodytext=this.mes;
    console.log(pay);    
    this.socket.emit('new message', pay );
  }
}
