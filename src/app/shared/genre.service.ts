import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genreList : AngularFireList<any>;
  array =[];

  constructor(private firebase: AngularFireDatabase) { 
    this.genreList = this.firebase.list('genres');
    this.genreList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }


  // getGenreName($key) {
  //   if ($key == "0")
  //     return "";
  //   else{
  //     return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
  //   }
  // }


}
