import { Component, OnInit , ViewChild} from '@angular/core';
import { SerieService } from 'src/app/shared/serie.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { GenreService } from 'src/app/shared/genre.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.css']
})
export class SerieFormComponent implements OnInit {

//first one after we injected SerieService in to App.Module, we have to create an Object of the SerieService  inside the constructor

  constructor(public serieService: SerieService,
              public genreService: GenreService,
              private notificationService : NotificationService,
              public dialogRef: MatDialogRef<SerieFormComponent>

              ) {  }

title =  this.serieService.form.get('title').value;
genre = this.serieService.form.get('genre').value;
year = this.serieService.form.get('year').value;
imgUrl = this.serieService.form.get('imageUrl').value;

@ViewChild('autosize') autosize: CdkTextareaAutosize;


  ngOnInit() {
    this.serieService.getSeries();
  }
 
  
  // reset fonction of formGroup property(form). when we call this reset fonction, all of the values of the control values will be come NULL.
  //so we have to ReInitilize the formControls to the initial default values, for that we will define anOther fonction initializeFormGroup(), 
  //in our service Class 
  onClear(){
    this.serieService.form.reset();
    this.serieService.initializeFormGroup();
  }

  onSubmit() {
    if (this.serieService.form.valid) {
      if (!this.serieService.form.get('$key').value)
        this.serieService.insertSerie(this.serieService.form.value);
      else
      this.serieService.updateSerie(this.serieService.form.value);
      this.serieService.form.reset();
      this.serieService.initializeFormGroup();
      this.notificationService.success('Submitted successfully');
      this.onClose();
    }
  }


  onClose() {
    this.serieService.form.reset();
    this.serieService.initializeFormGroup();
    this.dialogRef.close();
  }
}
