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
    this.api.getAll().subscribe((response) => {
      this.data = response;
      // Flag for the ngIf in the HTML
      this.isLoaded = true;
      // formatage de la date
      this.frDate = frenchDate();
      console.log(this.data.records);
      this.events = this.data.records.map(eventFormat);
      console.log(this.events);
//      this.eventsSorted = eventSort(this.events);
      console.log(this.eventsSorted);
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
  const tempHeure = '';
  console.log(events.length);
  for ( let i = 0 ; i < events.length ; i++ ) {
    const indice = i;
    console.log(`indice i = ${ i } - timetable ${ events[i].fields.timetable }`);
    /*
    for ( let j = 0 ; j < events.length ; j++ ) {
      if ( this.events([j]).fields.timetable < tempHeure) {
        this.tempHeure = this.events([j]).fields.timetable;
      } // endif
      eventsSorted.push(events[indice]);
    } // endfor
    */
    return eventsOut;
  } // fin de evenSort
};

