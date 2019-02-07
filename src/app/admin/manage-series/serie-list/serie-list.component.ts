import { Component, OnInit, ViewChild  } from '@angular/core';
import { SerieService } from 'src/app/shared/serie.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { GenreService } from 'src/app/shared/genre.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent implements OnInit {


  constructor(private serieService: SerieService,
              private genreService: GenreService) { }

  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'year', 'summary','imageUrl', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.serieService.getSeries().subscribe(
     list => {
       let array = list.map(item => {
        // let genreName = this.genreService.getGenreName(item.payload.val()['genre']);
         return {
           $key: item.key,
            // genreName,
           ...item.payload.val()
         };
       });
       this.listData = new MatTableDataSource(array);
       this.listData.sort = this.sort;
       this.listData.paginator = this.paginator;
       this.listData.filterPredicate = (data, filter) => {
         return this.displayedColumns.some(ele => {
           return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
         });
       };

     });
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
