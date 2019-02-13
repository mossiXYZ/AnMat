import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  // we will convert genreList to an array[]  
  genreList : AngularFireList<any>;
  array =[];
// genreList is an ANgularFireList and in order to convert that to array[], we have to convert this to an observable 
//snapshotChanges() will convert genreList to an Observable, so we can subscribe to that observable, 
// inside that wa have arrow function with the single parameter "list" => , then we will generate this.array from the list
//we will call this map() fonction, inside that we have another arrow fonction whit single parametre 'item' =>
// and we will return an objet  containing properties (for example here 'code' and 'name') from the collection in firebase console  
//and after we applyed ... syntax from JS, so " ...item.payload.val()" is an object containing 2 parameters (code, name )
// along with these properties we need $key or primaryKey of the item, for that item.key will give us this value  
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
