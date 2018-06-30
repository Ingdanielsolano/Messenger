import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import {Usuario} from '../Class/usuario'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PersonApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/



@Injectable()
export class PersonApi {
  private options;  
  private url = 'http://localhost:8080/person';

  constructor(public http: Http) {    
    let token = localStorage.getItem('token');
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    this.options=new RequestOptions({headers:headers});
  }



  getPerson() {
    return new Promise((resolve, reject) => {
      let urll=this.url;
      this.http.get(urll,this.options)
        .map(res => res.json())
        .subscribe(data => {
          return resolve(data)
        })
    })
  }
  /*postInventario(inventario:Inventario){
    let url = `${this.url}`;
    let iJson = JSON.stringify(inventario);     
    return this.http.post(url,iJson,this.options)
               .map(r=>r.json())
               .catch(this.handleError);               
  }
  */
  registerPerson(usuario:Usuario){
    let url = `${this.url}/`;
    let iJson = JSON.stringify(usuario);     
    console.log(iJson);
    console.log(url);
    return this.http.post(url,iJson,this.options)
               .map(r=>r.json())
               .catch(this.handleError); 
  }

  private handleError(error:Response|any){
    let errMsg:string;
    if(error instanceof Response){
      let body=error.json()||'';
      let err=body.error || JSON.stringify(body);
      errMsg=`${error.status}-${error.statusText||''} ${err}`;
      console.log(errMsg);
    }else{
      errMsg=error.message? error.message :error.toString();
      console.log(errMsg);
    }
    return Observable.throw(errMsg);
  }
}
