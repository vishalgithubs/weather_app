import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as constants from './weather-constants';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private _httpClient: HttpClient) { }

  APIkey = '756599d76847725d13eb710b74acd694';
  latitudes: any;
  longitudes: any;

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      
      navigator.geolocation.getCurrentPosition(resp => {
        this.latitudes = resp.coords.latitude;
        this.longitudes = resp.coords.longitude;
        
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  getCurrent(latitudes:any,longitudes:any): Observable<any> {
    let requestUrl = constants.GetCurrentCity + 'lat=' + latitudes + '&lon=' + longitudes + '&appid=' + this.APIkey;
    return this._httpClient.get(requestUrl).pipe();
  }
  
  getCurrentWeather(cityName:any,countryName:any): Observable<any> {
    let requestUrl = constants.GetCurrentCityWeather + cityName+','+ countryName + '&appid=' + this.APIkey;
    return this._httpClient.get(requestUrl).pipe();
  }

  getGraphWeather(latitude:any,longitude:any): Observable<any> {
    let requestUrl = constants.GetGraphWeather + 'lat='+ latitude + '&lon='+ longitude + '&appid=' + this.APIkey;
    return this._httpClient.get(requestUrl).pipe();
  }

}
