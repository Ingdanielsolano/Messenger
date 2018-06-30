import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    userName: String;
    loggedIn: boolean;
    url = 'http://localhost:8080/person';

    constructor(private http: Http) {
        this.userName = '';
        this.loggedIn = false;
    }

    login(userInfo) {
        let url = `${this.url}/login`;
        let ijson = JSON.stringify(userInfo);
        console.log(ijson);
        return this.http.post(url, ijson, {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .map(res => res.text())
            .map(res => {                
                if (res == 'error' || res == 'false') {
                    this.loggedIn = false;
                } else {
                    localStorage.setItem('token', res);
                    localStorage.setItem('user', userInfo.user);
                    this.userName = userInfo.user;
                    this.loggedIn = true;
                }
                return this.loggedIn;
            })
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.userName = '';
        this.loggedIn = false;
    }


    isLoggedIn() {
        return this.loggedIn;
    }

}