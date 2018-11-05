import { Component, OnInit, Input } from '@angular/core';
import { ListEventsComponent } from '../list-events/list-events.component';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
// import service for API request
import { OpenDataParisServices } from '../services/OpenDataParisServices';

@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.css']
})
export class DetailsEventsComponent implements OnInit {

  @Input() id: any;
  @Input() events: any[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.id = +this.id;
  }

}
