import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { OpenDataParisServices } from '../services/OpenDataParisServices';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})

export class ListEventsComponent implements OnInit {
  data : any;
  event : Event;
  alias = "data.records"
  
  constructor(private api : OpenDataParisServices) {
  }

  ngOnInit() {
    this.api.getConcerts().subscribe((response) => {
      this.data = response;
      console.log("Réponse API ", this.data.records);
      console.log(this.data.records.length);
      console.log(this.api);
      this.dateFilter (this.data.records[1].fields.timetable);
      for (let i = 0; i < this.data.records.length; i++) {
        //  console.log(this.data.records[i].fields.date_start);
        //  Extraction de l'heure
        this.data.records[0].fields.timetable = this.data.records[0].fields.timetable.slice(11, 16);
      }
    });
    
  }

  dateFilter (timeTable : string) {
    let dateEvent = "";
    let todaysDate = this.api.todaysDate;
    console.log(timeTable);
    let tab = timeTable.split(" ").join(";").split(";");
    dateEvent = tab.find((element) => {
      return element <= todaysDate;
    });    
    console.log(dateEvent);
    console.log(tab);



    console.log(todaysDate);
    // return dateEvent;
  }
}
