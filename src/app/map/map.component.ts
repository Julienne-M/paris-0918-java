import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;

  constructor() { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
  const map = L.map('map').setView([48.855, 2.347], 7);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Carte de Paris'
  }).addTo(map);

  map.locate({setView: true, maxZoom: 16});

//   function onLocationFound(e) {
//     const radius = e.accuracy / 2;

//     L.marker(e.latlng).addTo(map)
//         .bindPopup('You are within ' + radius + ' meters from this point').openPopup();

//     L.circle(e.latlng, radius).addTo(map);
// }

map.on('locationfound', onLocationFound);

function onLocationFound(e) {
  const myIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });
  L.marker([e.latitude, e.longitude], {icon: myIcon}).bindPopup('Vous êtes ici').addTo(map).openPopup();

}

function onLocationError(e) {
  alert(e.message);
}
map.on('locationerror', onLocationError);

// map.on('locationfound', onLocationFound);

  // const myIcon = L.icon({
  //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  // });
  // L.marker([48.850564, 2.350188], {icon: myIcon}).bindPopup('Vous êtes ici').addTo(map).openPopup();
  // }


  }
}
