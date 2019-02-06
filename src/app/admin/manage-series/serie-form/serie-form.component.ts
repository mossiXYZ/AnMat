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
  }
  onClear(){
    this.serieService.form.reset();
    this.serieService.initializeFormGroup();
  }
}
