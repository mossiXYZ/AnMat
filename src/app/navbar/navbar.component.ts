import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  value = '';
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(x => console.log(x));
    afAuth.authState.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  logout(){

  }
}
