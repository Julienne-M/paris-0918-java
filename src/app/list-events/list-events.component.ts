import { Component, OnInit } from '@angular/core';
import { OpenDataParisServices } from '../services/OpenDataParisServices';
import { MapServices } from '../services/map.services';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})

export class ListEventsComponent implements OnInit {
  isLoaded = false;
  data: any;
  events: [any];
  eventsSorted: Array<any>;
  frDate: string;

  constructor(private api: OpenDataParisServices, private gps: MapServices) {
  }

  ngOnInit() {
    this.gps.findme();
    // formatage de la date
    this.frDate = frenchDate();
    // api OpenDataParis call
    this.api.getAll().subscribe((response) => {
      this.data = response;
      // Flag for the ngIf in the HTML
      this.isLoaded = true;
      // format timetable field
      this.events = this.data.records.map(eventFormat);
      // sort events list
      this.eventsSorted = eventSort(this.events);
      this.api.setFilteredArray(this.eventsSorted);
    });
  }
}

// display a date in the french format
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

// cast the hour of the event
const eventFormat = (event: any) => {
 event.fields.timetable = event.fields.timetable.slice(11, 16);
 console.log(event.fields.date_end);
 return event;
};

// sort the list of events by started hour
const eventSort = (eventsIn: [any]) => {

  const eventsOut: Array<any> = [];      // sorted array
  const alreadySort: Array<number> = []; // array of index of event already sorted
  let tempHour: string;
  let index: number;

  while (eventsOut.length !== eventsIn.length) {
    index = 0;
    tempHour = '24:00';
    // boucle sur la liste pour voir si un événement ne commence pas plus tôt
    for (let j = 0; j < eventsIn.length; j++) {
      if (!alreadySort.includes(j) && eventsIn[j].fields.timetable <= tempHour) {
        tempHour = eventsIn[j].fields.timetable;
        index = j;
      } // endif
    } // endfor
    // fill the new array with de next time event
    eventsOut.push(eventsIn[index]);
    alreadySort.push(index);
  } // end while

  return eventsOut;
};
