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
  regexGratuit = /gratuit|Gratuit|libre/;
  regexPayant = /€|euros|Euros/;
  inputDate: string;
  result: any;
  isgood = false;
  dateFormIsValid = false;
  isLoading = false;
  noEvents = false;

  constructor(private openDataParisService: OpenDataParisServices) { }

  ngOnInit() {}

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

  handleDateChange() {
    const userInputElement = <HTMLInputElement>document.getElementById('userInput');
    this.inputDate = userInputElement.value; //userInputElement.innerText || userInputElement.textContent;
    if (this.inputDate.length === 10) {
    this.dateFormIsValid = true;
    } else {
      this.dateFormIsValid = false;
      this.inputDate = null;
    }
  }

  returnSearchResults() {
    this.isLoading = true;
    if (this.concertType) {
      this.openDataParisService.getConcertsWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
        });
    } else if (this.expositionType) {
      this.eventType = this.openDataParisService.getExpositionsWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
      });
    } else if (this.theaterType) {
      this.eventType = this.openDataParisService.getTheatersWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
      });
    } else if (this.clubbingType) {
      this.eventType = this.openDataParisService.getClubbingsWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
        this.isThereNoEvents(this.isgood, this.result);

      });
    } else if (this.showType) {
      this.eventType = this.openDataParisService.getShowsWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
      });
    } else if (this.cinemaType) {
      this.eventType = this.openDataParisService.getCinemasWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
      });
    } else if (this.conferenceType) {
      this.eventType = this.openDataParisService.getConferencesWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
      });
    } else {
      this.openDataParisService.getAllWD().subscribe((response) => {
        this.eventType = response;
        this.result = this.secondFilter(this.eventType);
        this.isLoading = false;
        this.isgood = true;
      });
    }
  }
  secondFilter = (eventType) => {
    if (this.inputDate != null) {
      if (this.gratuitType) {
        this.eventTypePricing = eventType.records.filter(event => this.regexGratuit.test(event.fields.pricing_info) &&
        event.fields.date_start === this.inputDate );
      } else if (this.payantType) {
        this.eventTypePricing = eventType.records.filter(event => this.regexPayant.test(event.fields.pricing_info) &&
        event.fields.date_start === this.inputDate );
      } else {
        this.eventTypePricing = eventType.records.filter(event => event.fields.date_start === this.inputDate );
      }
    } else {
      if (this.gratuitType === true) {
        this.eventTypePricing = eventType.records.filter(event => this.regexGratuit.test(event.fields.pricing_info) &&
        event.fields.date_start === this.openDataParisService.todaysDateAPIForm);
      } else if (this.payantType === true) {
        this.eventTypePricing = eventType.records.filter(event => this.regexPayant.test(event.fields.pricing_info) &&
        event.fields.date_start === this.openDataParisService.todaysDateAPIForm);
      } else {
        this.eventTypePricing = eventType.records.filter(event => event.fields.date_start === this.openDataParisService.todaysDateAPIForm);
      }
    }
    return this.eventTypePricing;
  }
  isThereNoEvents = (isgood, result) => {
    console.log('entré dans isThereNoEvent');
    if (isgood ===  true && result === undefined) {
      isgood = false;
      this.noEvents = true;
      console.log('pas devents dsl');
    }
  }
}
