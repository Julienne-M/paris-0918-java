import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})

export class MapServices {

  constructor(private http: HttpClient) { }

  data: any;

  urlBase = `https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&refine.date_start`;

  getGeoloc() {
    return this.http.get(`${this.urlBase}&refine.tags=concert`);
  }

}

