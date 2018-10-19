import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { OpenDataParisServices } from '../services/OpenDataParisServices';
import { HttpClient , HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})

export class ListEventsComponent implements OnInit {
  data : any;
  record1 = {
    date_start: '2018-10-16',
    address: '56 rue ducouedic 75016 Paris',
    description: 'description de l event',
    image_thumb: 'vignette de l event',
    latlon: [48.853801, 2.349876],
    link: 'lien vers la réservation',
    placename: 'Maison de la Radio',
    pricing_info: 'gratos',
    space_time_info:'9:00',
    title: 'Concert sur la plage'
  }

  record2 = {
    date_start: '2018-10-30',
    address: '11 rue de Poissy',
    description: 'Hackathon',
    image_thumb: 'vignette de l event',
    latlon: [48.853801, 2.349876],
    link: 'sans réservation',
    placename: 'Wild Code School',
    pricing_info: 'gratos',
    space_time_info:'9:00',
    title: 'Code or die !'
  }

  record3 = {
    date_start: '2018-10-31',
    address: '11 rue de Poissy',
    description: 'Hackathon',
    image_thumb: 'vignette de l event',
    latlon: [48.853801, 2.349876],
    link: 'sans réservation',
    placename: 'Wild Code School',
    pricing_info: 'gratos',
    space_time_info:'00:00',
    title: 'Still alive ?'
  }   

  record4 = {
    date_start: '2018-11-05',
    address: 'rue de Pontoise',
    description: 'Centre sportif',
    image_thumb: 'vignette de l event',
    latlon: [48.853801, 2.349876],
    link: 'sans réservation sauf pour le squash',
    placename: 'Piscine Pontoise',
    pricing_info: '21€',
    space_time_info:'12:00',
    title: `Aujourd'hui on plonge !`
  }  

  event : Event[];
  //event
  // event[0] = this.record1;
  event2 = new Event(this.record2);
  event3 = new Event(this.record3);
  event4 = new Event(this.record4);

  constructor(private api : OpenDataParisServices) {
  }

  ngOnInit() {
    this.api.getConcerts().subscribe((response) => {
      this.data = response;
      console.log("Réponse API ", this.data.records);
      console.log(this.data.records.length);
      console.log(this.api);
    for ( let i = 0 ; i < this.data.records.length ; i++) {
      console.log(this.data.records[i].fields.date_start);
    }
    });
    
  }

}
