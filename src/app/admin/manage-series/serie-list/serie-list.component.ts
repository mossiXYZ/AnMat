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

  // inside displayedColumns array we will name each columns that we have to show in our angular DataTable  
  displayedColumns: string[] = ['title', 'year', 'genre','summary','imageUrl', 'actions'];

// this ViewChild decorator will look for the directive MatSort and MatPaginator inside the HTML file, so 
//so we can link sort and paginator properties to this.lisData(MatTableDataSource(array))  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
//twoWayDataBinding
  searchKey: string;

  // this.serieService.getSeries() will return and observable  and we can subscribe to it.
  //inside the subscrieb function wa have to convert that AngularFireList in to an Array.
  //we have the call back function with the single parametre list => inside that we define arrayvariable and 
  //and we will call the map fonction from list parametre and inside that we have another call back fonction 
  //with single parametre "item", inside this fonction we will return an object containing "serie details"
  //now for showing our list(array), we use MaterialTabelData. parent module is MatTableModule and 
  //and we will convert our array to MatTableDataDataSource, which is another class from MatTableModule
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

       this.listData = new MatTableDataSource(array);//we can use this listData to render the DataTable
       this.listData.sort = this.sort;
       this.listData.paginator = this.paginator;

      //  this.listData.filterPredicate = (data, filter) => {
      //    return this.displayedColumns.some(ele => {
      //      return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      //    });
      //  };

     });
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
// we will remove white spaces from both ends and we will convert that string in to lowerCase
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  //inside  this fonction we must open SerieFormComponent.html, in order to open in a dialog window  wen must use open() fonction from this.dialog
  // in order to open a component in a dialog window, we have to add that comopenent in appModule.ts 
  //when we submit this form, corresponding employee record will be inserted to firebaseDB, along with that we have to close this popUp model, 
  //in order to close that dialog after form submition we have to write code inside SerieForm component, beacasue form submition is done in this component 
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
