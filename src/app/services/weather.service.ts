import { Injectable } from '@angular/core';
import { weatherEnviroment } from 'src/environments/environment'
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = "https://api.openweathermap.org/data/3.0/onecall?lat=40.48205&lon=-3.35996&appid=" + weatherEnviroment.apiKey + "&units=metric&lang=es"
  constructor(
     private http: HttpClient,
  ) {
    
   }

  getWeather(){
    return this.http.get(this.url)
  }
}
