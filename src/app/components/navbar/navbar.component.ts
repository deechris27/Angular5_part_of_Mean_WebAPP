import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _flashMessagesService: FlashMessagesService,
             private _authService: AuthService,
             private router: Router) { }

  ngOnInit() {
  }

  onLogoutClick(){
     this._authService.logOut();
     this._flashMessagesService.show('You are logged out!', {timeout: 2000, cssClass: 'alert-warning'});
     this.router.navigate(['/login']);
     return false;
  }

}
