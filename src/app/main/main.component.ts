import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit {
  private map!: L.Map;

  htmlIcon = L.icon({
    iconUrl: 'assets/marker.png',
    iconSize: [30, 30], 
    iconAnchor: [10, 10], 
    popupAnchor: [5,-5], 
  });

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.map.setView(new L.LatLng(latitude, longitude), 13);
          L.marker([latitude, longitude], { icon: this.htmlIcon }) // Use custom icon here
            .addTo(this.map)
            .bindPopup('You are here!')
            .openPopup();
        },
        () => {
          alert('Cannot access your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
