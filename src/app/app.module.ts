import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatInputModule, MatIconModule, MatButtonModule, MatSliderModule, MatSortModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {CatalogComponent, DialogOverview} from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { FilterPipe } from './filter.pipe';
import { FilterCheckboxPipe } from './filter-checkbox.pipe';
import { FilterNumberPipe } from './filter-number.pipe';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CatalogComponent,
    NavbarComponent,
    FilterPipe,
    FilterCheckboxPipe,
    FilterNumberPipe,
    DialogOverview
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule, MatInputModule, MatIconModule, MatButtonModule, MatSliderModule, MatSortModule, MatSelectModule, MatDialogModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  entryComponents: [
    DialogOverview
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
