import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as io from "socket.io-client";
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-tray',
  templateUrl: 'tray.html',
})
export class TrayPage {
  public socket;
  public socketHost;
  user: string;
  session = {
    sender: 'a'
  }
  mensajesmostrar: any = [];
  mensajes: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    storage.get('user').then((val) => {
      this.session.sender = val;
      this.user = val;
    }).then(() => {
      new Promise((resolve, reject) => {
        this.socketProccess();
      });
    }
    );



  }

  socketProccess() {
    this.socketHost = "http://localhost:8081";
    this.socket = io(this.socketHost);
    this.socket.emit('started', this.session);
    this.socket.on('messages'+this.session.sender, data => {
      this.mensajes = data;
    });
  }

  chat(item) {
    this.navCtrl.push(ChatPage, { senderr: this.user, addres: item.Usuario });
  }


}
