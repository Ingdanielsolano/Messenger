import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "./auth.service";
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../Register/Register"
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    isLogged: boolean = false;
    error: string = '';
    constructor(
        private storage:Storage,
        public navCtrl: NavController,
        public navParams: NavParams, 
        private auth: AuthService,
        public alertCtrl: AlertController
        ) {}

    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos',
      subTitle: '¡Usuario o contraseña incorrectos!',
      buttons: ['Aceptar']
    });
    alert.present();
  }

    login(Usuario, Contrasena) {
        let an = {
            usuario: Usuario,
            contrasena: Contrasena
        }        
        this.auth.login(an)
            .subscribe(
            rs => this.isLogged = rs,
            er => console.log(er),
            () => {                                
                if (this.isLogged) {
                    this.goInventario(Usuario);
                } else {
                    this.error = 'error';
                    this.showAlert();
                }
            }
            )
    }
    goInventario(u){        
        console.log(u);
        this.storage.set('user', u);
        this.navCtrl.push(TabsPage,{param1 : 'hola'});
    }
    Register(){
        this.navCtrl.push(RegisterPage);
    }


}