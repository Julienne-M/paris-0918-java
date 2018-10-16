import { Component, OnInit } from '@angular/core';
import { Event } from '../event';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  public events: Event[] = [
    new Event('Concert'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
