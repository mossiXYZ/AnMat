import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor() { }


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
}
