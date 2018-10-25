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
    this.api.getConcerts().subscribe((response) => {
      this.data = response;
      // Flag for the ngIf in the HTML
      this.isLoaded = true;
      // formatage de la date
      this.frDate = frenchDate();
      // Fliter for the time of Event
      for (let i = 0; i < this.data.records.length; i++) {
        //  Extraction de l'heure
        // this.dateFilter (this.data.records[i].fields.timetable);
        this.data.records[i].fields.timetable = this.data.records[i].fields.timetable.slice(11, 16);
        console.log(this.data);


      }
    });

  }

  dateFilter (timeTable: string) {
    let dateEvent = '';
    const todaysDate = this.api.todaysDate;

    const tab = timeTable.split(' ').join(';').split(';');
    dateEvent = tab.find((element) => {
      return element <= todaysDate;
    });
    // return dateEvent;
  }
}

function frenchDate(date = new Date()) {
  let frDate: string;
  const space = ' ';
  const weekDay = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
  'Octobre', 'Novembre', 'Décembre'];
  // récupération du jour de la semaine
  frDate = weekDay[date.getUTCDay()] + space;

  // récupération date du jour
  frDate += date.getUTCDate() + space;

  // récupération du mois de l'année
  frDate += month[date.getMonth()] + space;

  // Récupération de l'année
  frDate += date.getFullYear();

  console.log(frDate);

  return frDate;
}
