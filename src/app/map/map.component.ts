import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenDataParisServices } from '../services/OpenDataParisServices';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  dataFiltered = [];
  event: any;

  constructor(private route: ActivatedRoute, private api: OpenDataParisServices) { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const map = L.map('map').setView([48.850564, 2.350188], 12);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Carte de Paris'
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    map.on('locationfound', onLocationFound);
    map.on('locationfound', eventLocation);

    function onLocationFound(e: any) {
      const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      });
      L.marker([e.latitude, e.longitude], { icon: myIcon }).bindPopup('Vous êtes ici').addTo(map).openPopup();
    }

    function eventLocation(latlon: any) {
      const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      });
      L.marker([latlon[0], latlon[1]], {icon: myIcon}).bindPopup('Votre événement').addTo(map).openPopup();
    }

    function onLocationError(e) {
      alert(e.message);
    }

  map.on('locationerror', onLocationError);
  }
}
