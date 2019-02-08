import { Component, OnInit, ViewChild  } from '@angular/core';
import { SerieService } from 'src/app/shared/serie.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { GenreService } from 'src/app/shared/genre.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from 'src/app/shared/notification.service';
import { SerieFormComponent } from '../serie-form/serie-form.component';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent implements OnInit {
  

  constructor(private serieService: SerieService,
              private genreService: GenreService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogService: DialogService) { }

  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'year', 'summary','genre','imageUrl', 'actions'];
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


  onCreate() {
    this.serieService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SerieFormComponent,dialogConfig);
  }

  onEdit(row){

    this.serieService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "80%";

    this.dialog.open(SerieFormComponent,dialogConfig);
  }

  onDelete($key){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.serieService.deleteSerie($key);
        this.notificationService.warn('! Deleted successfully');
      }
    });
  }


}
