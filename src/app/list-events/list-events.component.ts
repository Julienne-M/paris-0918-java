import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { OpenDataParisServices } from '../services/OpenDataParisServices';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})

export class ListEventsComponent implements OnInit {
  isLoaded = false;
  data: any;
  frDate: string;

  constructor(private api: OpenDataParisServices) {
  }

  ngOnInit() {
    this.api.getAll().subscribe((response) => {
      this.data = response;
      // Flag for the ngIf in the HTML
      this.isLoaded = true;
      // formatage de la date
      this.frDate = frenchDate();
      // Fliter for the time of Event
      for (let i = 0; i < this.data.records.length; i++) {
        //  Extraction de l'heure
        this.data.records[i].fields.timetable = this.data.records[i].fields.timetable.slice(11, 16);
      }
      // this.data.records.fields.timetable.sort();
      console.log(this.data);
    });
  }
}

const frenchDate = (date = new Date()) => {
  const weekDay = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const month   = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
                   'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const space = ' ';

  // récupération du jour de la semaine, du mois et de l'année en français
  return   weekDay[date.getUTCDay()] + space
         + date.getUTCDate() + space
         + month[date.getMonth()] + space
         + date.getFullYear();
};
