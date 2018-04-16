import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  password: string;
  email: string;

  constructor(private validateService: ValidateService,
     private _flashMessagesService: FlashMessagesService,
   private authService: AuthService,
   private router: Router) { }

  ngOnInit() {
  }

  onRegister(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)){
      this._flashMessagesService.show('Please enter all required fields!', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this._flashMessagesService.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data =>
      {
      if(data.success){
        this._flashMessagesService.show('Registration successfull', {timeout: 1000, cssClass: 'alert-success'});
        this.router.navigate(['/login']);
      }else{
        this._flashMessagesService.show('Failed to register!', {timeout:2000, cssClass: 'alert-danger'});
        this.router.navigate(['/register']);
      }
       }
    );
  }

}
