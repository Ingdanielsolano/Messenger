import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Usuario } from '../../Class/usuario';
import { PersonApi } from "../../providers/person-api";

@Component({
  selector: 'page-Register',
  templateUrl: 'Register.html'
})
export class RegisterPage {

  usua: Usuario = new Usuario();
  public dato;
  Rpass: string;
  very: string;


  constructor(public navCtrl: NavController, public PersonApi: PersonApi) {

  }

  Register() {    
    if (this.usua.cedula != this.Rpass && 
    this.usua.nombre != "" && 
    this.usua.apellido != "" && 
    this.usua.usuario != "" && 
    this.usua.contrasena != "") {
      console.log("into");
      this.PersonApi.registerPerson(this.usua)
        .subscribe(
        rt => console.log(rt),
        er => console.log(er),
        () => console.log()
        )
    }else{
      this.very="Some field is wrong, please check.";
    }

  }
}
