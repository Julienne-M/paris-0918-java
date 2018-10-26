import { Component, OnInit } from '@angular/core';
import { ListEventsComponent } from '../list-events/list-events.component';
// import service for API request
import { OpenDataParisServices } from '../services/OpenDataParisServices';

@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.css']
})
export class DetailsEventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
