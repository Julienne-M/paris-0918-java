import { Component, OnInit } from '@angular/core';
import { OpenDataParisServices } from '../services/OpenDataParisServices';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})

export class ParametersComponent implements OnInit {
  concertType = false;
  cinemaType = false;
  gratuitType = false;
  payantType = false;
  eventType: any;
  regexGratuit = /gratuit|Gratuit|libre/;
  regexPayant = /€|euros|Euros/;
  inputDate = '2011-12-17';
  col = 'blue';

  constructor(private openDataParisService: OpenDataParisServices) { }

  ngOnInit() {
  }

  changeConcertsFlag() {
    this.concertType = !this.concertType;
    this.cinemaType = false;
    if (this.concertType) {
      this.col = 'blue';
    } else {
      this.col = 'red';
    }
  }

  changeCinemasFlag() {
    this.cinemaType = !this.cinemaType;
    this.concertType = false;
    if (this.concertType) {
      this.col = "blue";
    } else {
      this.col = "red";
    }
  }

  changeGratuitsFlag() {
    this.gratuitType = !this.gratuitType;
    this.payantType = false;
  }

  changePayantsFlag() {
    this.payantType = !this.payantType;
    this.gratuitType = false;
  }

  returnSearchResults() {
    if (this.concertType) {
      this.eventType = this.openDataParisService.getConcerts();
      console.log(this.eventType);

    } else if (this.cinemaType) {
      this.eventType = this.openDataParisService.getCinemas();
    }
    if (this.inputDate != null) {
      if (this.gratuitType) {// array.filter(élément => élément = 1)
        for (let i = 0; i < this.eventType.records.length; i++) {
          if (this.regexGratuit.test(this.eventType.records[i].fields.pricing_info) &&
              this.eventType.records[i].fields.date_start === this.inputDate) {
            console.log(this.eventType.records[i]);
          }
        }
      } else if (this.payantType) {
        for (let i = 0; i < this.eventType.records.length; i++) {
          if (this.regexPayant.test(this.eventType.records[i].fields.pricing_info) &&
              this.eventType.records[i].fields.date_start === this.inputDate) {
            console.log(this.eventType.records[i]);
          }
        }
      }
    } else {
      if (this.gratuitType === true) {
        for (let i = 0; i < this.eventType.records.length; i++) {
          if (this.regexGratuit.test(this.eventType.records[i].fields.pricing_info) &&
              this.eventType.records[i].fields.date_start === this.openDataParisService.todaysDateAPIForm) {
            console.log(this.eventType.records[i]);
          }
        }
      } else if (this.payantType === true) {
        for (let i = 0; i < this.eventType.records.length; i++) {
          if (this.regexPayant.test(this.eventType.records[i].fields.pricing_info) &&
              this.eventType.records[i].fields.date_start === this.openDataParisService.todaysDateAPIForm) {
            console.log(this.eventType.records[i]);
          }
        }
      }
    }
  }
}

/*
concertType = false;
  cinemaType = false;
  gratuitType = false;
  payantType = false;
  eventType : any;
  regexGratuit = /gratuit|Gratuit|libre/;
  regexPayant = /€|euros|Euros/;
  inputDate = '2011-12-17';
  col = 'blue';
  */
