import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  // in order to customize the notification we have to create an object of class MatSnackConfig 
  config : MatSnackBarConfig = {
    duration : 3000,
    horizontalPosition : 'right',
    verticalPosition: 'top'
  }

 //we use open() fonction from object snackBar inside that we pass "msg" parametre and as a seconde parametre we passe the 'action' 
 //in this case we will set action as empty , and for third parametre we pass config object 
 // we use panelCLass property from the config Object, since we have more than one class we have passed an array containing notification and success class  
  success(msg){
    this.config['panelClass'] = ['notification', 'success']
     this.snackBar.open(msg, '', this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
