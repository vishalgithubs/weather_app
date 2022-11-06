import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationServiceService } from 'src/app/services/location-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private locationService: LocationServiceService) { }

  ngOnInit(): void {
    this.getposition();
  }

  latitude: any = '';
  longitude: any = '';
  cityName: any = '';
  stateName: any = '';
  countryName: any = '';
  icon: any = '';

  temp: any = '';
  temp_min: any = '';
  temp_max: any = '';
  feels_like: any = '';
  pressure: any = '';
  humidity: any = '';
  currentWeather: any = '';
  
  convertedtemp: any = '';
  convertedtemp_min: any = '';
  convertedtemp_max: any = '';
  convertedfeels_like: any = '';
  convertedpressure: any = '';
  convertedhumidity: any = '';

  getposition() {
    this.locationService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.latitude = pos.lat;
      this.longitude = pos.lng;
      this.initialfunction();
    });
  }

  initialfunction() {
    this.locationService.getCurrent(this.latitude, this.longitude).subscribe(data => {
      console.log(data);
      this.cityName = data[0].name;
      this.stateName = data[0].state;
      this.countryName = data[0].country.replace('IN', 'India');
      this.getCurrentWeatherLocation();
    });
  }

  getCurrentWeatherLocation() {
    this.locationService.getCurrentWeather(this.cityName, this.countryName).subscribe(hello => {
      console.log(hello);
      this.icon = hello.weather[0].icon;
      this.temp = hello.main.temp;
      this.temp_min = hello.main.temp_min;
      this.temp_max = hello.main.temp_max;
      this.feels_like = hello.main.feels_like;
      this.pressure = hello.main.pressure;
      this.humidity = hello.main.humidity;
      this.currentWeather= hello.weather[0].description
      this.kelvinToCelcius();
    })
  }

  kelvinToCelcius() {
    // celsius = Kelvin - 273.15
    this.convertedtemp = this.temp + -273.15;
    this.convertedtemp_min = this.temp_min + -273.15;
    this.convertedtemp_max = this.temp_max + -273.15;
    this.convertedfeels_like = this.feels_like + -273.15;
    this.convertedpressure = this.pressure + -273.15;
    this.convertedhumidity = this.humidity + -273.15;
  }

refresh(){
  this.getposition();
}

}
