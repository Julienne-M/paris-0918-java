import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OpenDataParisServices {

  constructor(private http: HttpClient) { }

  data: any;

  todaysDate = new Date().toISOString();
  todaysDateAPIForm = this.todaysDate.slice(0, 10);

  urlBase = `https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&refine.date_start=${this.todaysDateAPIForm}`;

  getConcerts() {
    return this.http.get(`${this.urlBase}&refine.tags=concert`);
  }

  getExpositions() {
    return this.http.get(`${this.urlBase}&refine.tags=exposition`);
  }

  getTheaters() {
    return this.http.get(`${this.urlBase}&refine.tags=theatre`);
  }

  getClubbings() {
    return this.http.get(`${this.urlBase}&refine.tags=clubbing`);
  }

  getShows() {
    return this.http.get(`${this.urlBase}&refine.tags=spectacle`);
  }

  getCinemas() {
    return this.http.get(`${this.urlBase}&refine.tags=cinema`);
  }

  getConferences() {
    return this.http.get(`${this.urlBase}&refine.tags=conference`);
  }
}

