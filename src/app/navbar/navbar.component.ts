import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  value = '';

  constructor(public auth: AuthService,
              public router: RouterModule) { 
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.router="home"
  }
}
