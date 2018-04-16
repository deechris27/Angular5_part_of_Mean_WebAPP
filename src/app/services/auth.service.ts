import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  cred: any;

  constructor(private http: Http) { }

   registerUser(user){
     let headers = new Headers();
     headers.append('Content-type', 'application/json');
     return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
     .map(res => res.json());
   }

   loginUser(cred){
     let headers = new Headers();
     headers.append('Content-type', 'application/json');
     return this.http.post('http://localhost:3000/users/authenticate', cred, {headers: headers})
     .map(res => res.json());
   }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
