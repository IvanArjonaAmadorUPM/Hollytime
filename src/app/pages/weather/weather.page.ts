import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  
  data
  loading=true
  humidity
  maxTemp
  minTemp
  temp
  windSpeed
  currentIcon
  description
  date=new Date()
  currentDate
  hourly
  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.getData()
    this.getCurrentDate()
  }
  getCurrentDate() {
    this.currentDate = this.date.getDate() +" de "+ this.getMonth(this.date.getMonth()) +" "+ this.date.getHours() + ":" + this.date.getMinutes()
  }
  getData() {
    this.weatherService.getWeather().subscribe((result: any) =>{
      this.data = result
      
      setTimeout(() => {
        this.loading=false
        ; }, 1000);
      this.setData()
    } 
    )
  }
  setData() {
    this.humidity = this.data.current.humidity
    this.temp = Math.round(this.data.current.temp)
    this.windSpeed = this.data.current.wind_speed
    this.currentIcon = "https://openweathermap.org/img/wn/" + this.data.current['weather'][0].icon +"@2x.png"
    this.description = this.data.current['weather'][0].description
    this.maxTemp = Math.round(this.data.daily[0].temp.max)
    this.minTemp = Math.round(this.data.daily[0].temp.min)
    this.hourly = this.data.hourly

  }

  getMonth(month){
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return monthNames[month]
  }
  getTemp(temp){
    return  Math.round(temp)
  }
  getDay(day){
    let date = new Date(day * 1000)
    let result =  date.getDate() +"/"+ (date.getMonth()+1)
    return result
  }
  getHour(hour){
    let date = new Date(hour * 1000)
    let result =  date.getHours() + ":" + date.getMinutes() +"0"
    return result
  }
  getIcon(icon){

    return "https://openweathermap.org/img/wn/" + icon['weather'][0].icon +"@2x.png"
  }
}
