import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonApi } from '../../providers/person-api';
 
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

persons:any=[]
persons2:any=[]
  constructor(public navCtrl: NavController,public api:PersonApi) {
  this.api.getPerson().then(resultado=>{    
        this.persons=resultado;        
        console.log(this.persons);
    });
  }

}



