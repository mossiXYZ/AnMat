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

  getSeries(){
    this.serieList = this.firebase.list('series');
    return this.serieList.snapshotChanges();
  }



  insertSerie(serie){
    this.serieList.push({
    title: serie.title,
    year: serie.year,
    summary: serie.summary,
    genre: serie.genre,
    imageUrl: serie.imageUrl
    });
  }

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
  }
}
