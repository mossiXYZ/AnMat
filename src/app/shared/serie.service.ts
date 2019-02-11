import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private firebase: AngularFireDatabase ) { }

  serieList : AngularFireList<any>;

// form is a property of type FormGroup , we initialaize it with  the costructor of Form group
//inside that we must provide an {OBJECT} containing FormControls
// first FormControl is $Key property(use as primaryKey => is a unique identifie of each employee record from the collection)
//in order to use this formGroup property in other components classes we have to inject this SerieService in app.module.ts
  form : FormGroup = new FormGroup({
    $key: new FormControl(null),  
    title: new FormControl('', Validators.required),
    year: new FormControl(''),
    summary: new FormControl(''),
    genre: new FormControl(0),
    imageUrl: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      title: '',
      year: '',
      summary: '',
      genre: 0, 
      imageUrl: ''
    });
  }

  // first CRUD step is (READ) defining a fonction in order to  retrieve all inserted records in to this.serieList.
  // inside "this.firebase.list('series');"  we have collection 'series' in our firebase db, in type AngularFireList
  //in order to work with that it would be better that  we have an Observable
  getSeries(){
    this.serieList = this.firebase.list('series');
    return this.serieList.snapshotChanges();
  }


//insert a new object serie
// in order to insert a new record we can do this, we will call "push" fonction from the "AngularFireList" object serieList
//inside that we just need to passe an "object"  containing details of new Serie
//when we insert a new recorde in to firebaseDB collection it will create automatically  a primaryKey($key)
//in order to call(evoke) push fonction we must already initialize "serieList" property, we did it in fonction getSeries(), 
//now before any CRUD just we must call getSeries() in  ngOnInit() life cycle hook in SerieForm component
  insertSerie(serie){ 
    this.serieList.push({
    title: serie.title,
    year: serie.year,
    summary: serie.summary,
    genre: serie.genre,
    imageUrl: serie.imageUrl
    });
  }

  // it contains a single parameter "serie". in order to update an existing record we will call Update fonction of AngularFireList Object.
  // as a first parameter of update fonction we can the Primary key of the record, as seconde we will pass an Object containing updated details of serie
  updateSerie(serie){
    this.serieList.update(serie.$key,{
      title: serie.title,
      year: serie.year,
      summary: serie.summary,
      genre: serie.genre,
      imageUrl: serie.imageUrl
    });
  }

  deleteSerie($key: string){
    this.serieList.remove($key); 
  }
  populateForm(serie) {
    this.form.setValue(_.omit(serie,'genre.name'));
    console.log( this.form.get('title').value )

  }
}

