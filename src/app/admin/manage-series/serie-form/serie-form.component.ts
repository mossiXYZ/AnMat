import { Component, OnInit , ViewChild} from '@angular/core';
import { SerieService } from 'src/app/shared/serie.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.css']
})

export class SerieFormComponent implements OnInit {

  constructor(private serieService: SerieService) {   }

  genres = [
    {id: 3, value: 'Genre 1'},
    {id: 2, value: 'Genre 2'},
    {id: 3, value: 'Genre 3'}
  ]
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
    }
  }
}
