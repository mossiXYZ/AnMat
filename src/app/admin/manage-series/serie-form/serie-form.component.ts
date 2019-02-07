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

  constructor(private serieService: SerieService,
              private genreService: GenreService,
              private notificationService : NotificationService,
              public dialogRef: MatDialogRef<SerieFormComponent>

              ) {   }


@ViewChild('autosize') autosize: CdkTextareaAutosize;


  ngOnInit() {
    this.serieService.getSeries();
  }
  
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
