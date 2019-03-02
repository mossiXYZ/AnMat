import { Component, OnInit } from '@angular/core';
import { SerieService } from '../shared/serie.service';


interface Serie {
  title: string,
  year: string,
  summary: string,
  genre: string, 
  imageUrl: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allSeries : any[];
  newSeries: any[];
  recommandations: any[];
  constructor(private serieService : SerieService) { }

  ngOnInit() {
    this.serieService.getSeries().subscribe(
       
      listOfSeries => { 
        let array  = listOfSeries.map(item => {
          return {
            $key : item.key,
            ...item.payload.val()
          };
        });
        //console.log(array);
        this.allSeries = array;
        this.newSeries = array.filter(item => item.rate >4);
        this.recommandations = array.filter(item => item.dateread  == null);
      });
         
          //console.log(array);


  }

}
