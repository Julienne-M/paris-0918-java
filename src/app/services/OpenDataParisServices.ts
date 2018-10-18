import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get(`${this.urlBase}&refine.tags=concert`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }

  getExpositions() {
    this.http.get(`${this.urlBase}&refine.tags=exposition`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }

  getTheaters() {
    this.http.get(`${this.urlBase}&refine.tags=theatre`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }

  getClubbings() {
    this.http.get(`${this.urlBase}&refine.tags=clubbing`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }

  getShows() {
    this.http.get(`${this.urlBase}&refine.tags=spectacle`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }

  getCinemas() {
    this.http.get(`${this.urlBase}&refine.tags=cinema`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }

  getConferences() {
    this.http.get(`${this.urlBase}&refine.tags=conference`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }

  getFree() {
    this.http.get(`${this.urlBase}&refine.pricing_info=gratuit`).subscribe((response) => {
      this.data = response;
    });
    return this.data;
  }
}
