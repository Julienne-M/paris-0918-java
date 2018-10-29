import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { OpenDataParisServices } from '../services/OpenDataParisServices';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})

export class ListEventsComponent implements OnInit {
  isLoaded = false;
  data: any;
  events: [any];
  eventsSorted: [any];
  frDate: string;

  constructor(private api: OpenDataParisServices) {
  }

  ngOnInit() {
    // formatage de la date
    this.frDate = frenchDate();
    this.api.getAll().subscribe((response) => {
      this.data = response;
      // Flag for the ngIf in the HTML
      this.isLoaded = true;
      this.events = this.data.records.map(eventFormat);
      this.eventsSorted = eventSort(this.events);
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

const eventFormat = (event: any) => {
 event.fields.timetable = event.fields.timetable.slice(11, 16);
 return event;
};

const eventSort = (events: [any]) => {
  const eventsOut: any = [];
  const alreadySort = [];
  let tempHeure = '';
  let indice = 0;
  console.log( `nombre d'événements ${events.length}`);

  for (let i = 0; i < events.length; i++) {
    tempHeure = events[i].fields.timetable;
    for (let j = 0; j < events.length; j++) {
      if ( !alreadySort.includes(j) && events[j].fields.timetable < tempHeure ) {
        tempHeure = events[j].fields.timetable;
        indice = j;
      } // endif
    } // endfor
    eventsOut.push(events[indice]);
    alreadySort.push(indice);
  } // endfor
  for ( let i = 0; i < eventsOut.length; i++ ) {
    console.log(eventsOut[i].fields.timetable);
  }
  return eventsOut;
};
