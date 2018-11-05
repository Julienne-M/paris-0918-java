import { Component, OnInit } from '@angular/core';
import { OpenDataParisServices } from '../services/OpenDataParisServices';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})

export class ParametersComponent implements OnInit {
  concertType = false;
  expositionType = false;
  theaterType = false;
  clubbingType = false;
  showType = false;
  cinemaType = false;
  conferenceType = false;
  otherType = false;
  gratuitType = false;
  payantType = false;
  eventType: any;
  eventTypePricing: any;
  isReady = false;
  regexGratuit = /gratuit|Gratuit|libre/;
  regexPayant = /€|euros|Euros/;
  inputDate = '2011-12-17';

  constructor(private openDataParisService: OpenDataParisServices) { }

  ngOnInit() {
  }

  changeConcertsFlag() {
    this.concertType = !this.concertType;
    this.expositionType = false;
    this.theaterType = false;
    this.clubbingType = false;
    this.showType = false;
    this.cinemaType = false;
    this.conferenceType = false;
    this.otherType = false;
  }

  changeExpositionsFlag() {
    this.expositionType = !this.expositionType;
    this.concertType = false;
    this.theaterType = false;
    this.clubbingType = false;
    this.showType = false;
    this.cinemaType = false;
    this.conferenceType = false;
    this.otherType = false;
  }

  changeTheatersFlag() {
    this.theaterType = !this.theaterType;
    this.concertType = false;
    this.expositionType = false;
    this.clubbingType = false;
    this.showType = false;
    this.cinemaType = false;
    this.conferenceType = false;
    this.otherType = false;
  }

  changeClubbingsFlag() {
    this.clubbingType = !this.clubbingType;
    this.concertType = false;
    this.expositionType = false;
    this.theaterType = false;
    this.showType = false;
    this.cinemaType = false;
    this.conferenceType = false;
    this.otherType = false;
  }

  changeShowsFlag() {
    this.showType = !this.showType;
    this.concertType = false;
    this.expositionType = false;
    this.theaterType = false;
    this.clubbingType = false;
    this.cinemaType = false;
    this.conferenceType = false;
    this.otherType = false;
  }

  changeCinemasFlag() {
    this.cinemaType = !this.cinemaType;
    this.concertType = false;
    this.expositionType = false;
    this.theaterType = false;
    this.clubbingType = false;
    this.showType = false;
    this.conferenceType = false;
    this.otherType = false;
  }

  changeConferencesFlag() {
    this.conferenceType = !this.conferenceType;
    this.concertType = false;
    this.expositionType = false;
    this.theaterType = false;
    this.clubbingType = false;
    this.showType = false;
    this.cinemaType = false;
    this.otherType = false;
  }

  changeOthersFlag() {
    this.otherType = !this.otherType;
    this.concertType = false;
    this.expositionType = false;
    this.theaterType = false;
    this.clubbingType = false;
    this.showType = false;
    this.cinemaType = false;
    this.conferenceType = false;
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

    } else if (this.expositionType) {
      this.eventType = this.openDataParisService.getExpositions();
    }
    else if (this.theaterType) {
      this.eventType = this.openDataParisService.getTheaters();
    }
    else if (this.clubbingType) {
      this.eventType = this.openDataParisService.getClubbings();
    }
    else if (this.showType) {
      this.eventType = this.openDataParisService.getShows();
    }
    else if (this.cinemaType) {
      this.eventType = this.openDataParisService.getCinemas();
    }
    else if (this.conferenceType) {
      this.eventType = this.openDataParisService.getConferences();
    }
    else if (this.otherType) {
      this.eventType = this.openDataParisService.getAll();
    }
    if (this.inputDate != null) {
      if (this.gratuitType) {
        this.eventTypePricing = this.eventType.records.filter(event => this.regexGratuit.test(event.fields.pricing_info) &&
        event.fields.date_start === this.inputDate );
        this.isReady = true;
      } else if (this.payantType) {
        this.eventTypePricing = this.eventType.records.filter(event => this.regexPayant.test(event.fields.pricing_info) &&
        event.fields.date_start === this.inputDate );
        this.isReady = true;
      }
    } else {
      if (this.gratuitType === true) {
        this.eventTypePricing = this.eventType.records.filter(event => this.regexGratuit.test(event.fields.pricing_info) &&
        event.fields.date_start === this.openDataParisService.todaysDateAPIForm);
        this.isReady = true;
      } else if (this.payantType === true) {
        this.eventTypePricing = this.eventType.records.filter(event => this.regexPayant.test(event.fields.pricing_info) &&
        event.fields.date_start === this.openDataParisService.todaysDateAPIForm);
        this.isReady = true;
      }
    }
  }
}