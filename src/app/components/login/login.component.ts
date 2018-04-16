import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;


  constructor(private _validateService: ValidateService,
              private _authService: AuthService,
              private _flashMessagesService: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    const cred = {
      username: this.username,
      password: this.password
    }

     // this._validateService.validateCred(cred){
     //   if(!data.success){
     //    this._flashMessagesService.show('Please enter the login credentials', {timeout: 3000, cssClass: 'alert-danger'});
     //  }
     // }

     this._authService.loginUser(cred).subscribe(data=>
       {
         if(data.success){
           this._flashMessagesService.show('Login Successful', {timeout: 3000, cssClass: 'alert-success'});
           this._authService.storeUserData(data.token, data.user);
           this.router.navigate(['/dashboard']);
         }else{
           this._flashMessagesService.show(data.msg, {timeout: 3000, cssClass: 'alert-danger'});
           this.router.navigate(['/login']);
         }
     });



  }

}
