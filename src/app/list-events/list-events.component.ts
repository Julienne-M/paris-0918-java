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

  constructor(private api: OpenDataParisServices) {
  }

  ngOnInit() {
    this.api.getConcerts().subscribe((response) => {
      this.data = response;
      // Flag for the ngIf in the HTML
      this.isLoaded = true;
      // Fliter for the time of Event
      for (let i = 0; i < this.data.records.length; i++) {
        //  Extraction de l'heure
        // this.dateFilter (this.data.records[i].fields.timetable);
        this.data.records[i].fields.timetable = this.data.records[i].fields.timetable.slice(11, 16);
        console.log(this.data);
        daysDate();
        daysMonth();
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

 function daysDate(date = new Date()) {
   const weekDay = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
   console.log(date.getUTCDay(), weekDay[date.getUTCDay()]);
}

function daysMonth(month = new Date()) {
   const monthYear = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
  'Octobre', 'Novembre', 'Décembre'];
  console.log(month.getMonth(), monthYear[month.getMonth()]);
}
