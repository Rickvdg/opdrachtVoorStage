import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bier } from '../bier';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Sort} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  bieren: Bier[] = [];
  searchString: string;
  searchStijlen: string[];
  searchStijl: string;
  searchBrouwerij: string;
  maxPercentage: number;
  minSinds: number;
  searchGisting: string;
  gisting: any;
  sortedData;
  crudBier: Bier;
  selectedBier: number;

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  openDialog(id: number, name: string, stijl: string, stamwortgehalte: string, alcoholpercentage: string, gisting: string, sinds: number, brouwerij: string): void {
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '500px',
      data: {id: id, Bier: name, Stijl: stijl, Stamwortgehalte: stamwortgehalte, Alcoholpercentage: alcoholpercentage, Gisting: gisting, Sinds: sinds, Brouwerij: brouwerij}
    });
    console.log('id: ' + id);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sortData(sort: Sort) {
    const data = this.bieren.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Bier':
          return compare(a.Bier, b.Bier, isAsc);
        case 'Alcoholpercentage':
          return compare(Number.parseFloat(a.Alcoholpercentage.replace(',','.').slice(0, -1)), Number.parseFloat(b.Alcoholpercentage.replace(',','.').slice(0, -1)), isAsc);
        case 'Brouwerij':
          return compare(a.Brouwerij, b.Brouwerij, isAsc);
        case 'Stijl':
          return compare(a.Stijl, b.Stijl, isAsc);
        case 'Gisting':
          return compare(a.Gisting, b.Gisting, isAsc);
        case 'Sinds':
          return compare(+a.Sinds, +b.Sinds, isAsc);
        default:
          return 0;
      }
    });
  }

  standaardZoekTermen() {
    this.searchString = '';
    this.searchStijl = '';
    this.searchStijlen = [];
    this.searchBrouwerij = '';
    this.maxPercentage = 6.5;
    this.minSinds = 1800;
  }

  getBieren() {
    return this.http.get<Bier[]>('http://localhost:3000/bieren');
  }

  public addBeer(ID: number, name: string, stijl: string, stamwortgehalte: string, alcoholpercentage: string, gisting: string, sinds: number, brouwerij: string) {
    if (ID <= 0 || ID == null) {
      ID = this.bieren[-1].id + 1;
    }

    const body = {id: ID, Bier: name, Stijl: stijl, Stamwortgehalte: stamwortgehalte, Alcoholpercentage: alcoholpercentage, Gisting: gisting, Sinds: sinds, Brouwerij: brouwerij}

    this.http.post('http://localhost:3000/bieren', body).subscribe();
    console.log('Posted a new beer: ' + body);
  }

  ngOnInit() {
    this.getBieren().subscribe(bieren => {
      this.bieren = bieren as Bier[];
      this.sortedData = this.bieren;
    });

    this.gisting = ['', 'laag', 'hoog'];
    this.standaardZoekTermen();
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverview implements OnInit {

  bieren: Bier[] = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public addBeer(ID: number, name: string, stijl: string, stamwortgehalte: string, alcoholpercentage: string, gisting: string, sinds: number, brouwerij: string) {
    if (ID <= 0 || ID == null) {
      ID = this.bieren.length + 10;
    }

    const body = {id: ID, Bier: name, Stijl: stijl, Stamwortgehalte: stamwortgehalte, Alcoholpercentage: alcoholpercentage, Gisting: gisting, Sinds: sinds, Brouwerij: brouwerij}

    this.http.post('http://localhost:3000/bieren', body).subscribe();
    console.log('Posted a new beer: ' + body);
    this.dialogRef.close();
  }

  public changeBeer(ID: number, name: string, stijl: string, stamwortgehalte: string, alcoholpercentage: string, gisting: string, sinds: number, brouwerij: string) {
    const body = {id: ID, Bier: name, Stijl: stijl, Stamwortgehalte: stamwortgehalte, Alcoholpercentage: alcoholpercentage, Gisting: gisting, Sinds: sinds, Brouwerij: brouwerij}

    this.http.put('http://localhost:3000/bieren/' + ID, body).subscribe();
    console.log('Changed beer ' + ID);
    this.dialogRef.close();
  }

  public deleteBeer(ID: number) {
    this.http.delete('http://localhost:3000/bieren/' + ID).subscribe();
    console.log('Deleted beer ' + ID);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.http.get<Bier[]>('http://localhost:3000/bieren').subscribe(bieren => {
      this.bieren = bieren as Bier[];
    });
  }

}
