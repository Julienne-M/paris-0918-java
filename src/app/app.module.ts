import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { OpenDataParisServices } from './services/OpenDataParisServices';
import { ParametersComponent } from './parameters/parameters.component';
import { DetailsEventsComponent } from './details-events/details-events.component';
import { MapComponent } from './map/map.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'events', component: ListEventsComponent },
  { path: 'param', component: ParametersComponent },
  // { path: 'details', component: DetailsEventsComponent },
//  { path: 'events/:id', component: DetailsEventsComponent },
  { path: 'events/:event', component: DetailsEventsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListEventsComponent,
    FooterComponent,
    HomeComponent,
    ParametersComponent,
    DetailsEventsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    OpenDataParisServices
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
