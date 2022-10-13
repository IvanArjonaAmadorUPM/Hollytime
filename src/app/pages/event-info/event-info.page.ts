import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.page.html',
  styleUrls: ['./event-info.page.scss'],
})
export class EventInfoPage implements OnInit {
  @Input() evento;

  constructor() { }

  ngOnInit() {
  }
  getBackGroundColor(eventType){
    if(eventType=="especial"){
      return '#FFBE71';
    }
    if(eventType=="deporte"){
      return '#A3C37F';
    }    
    if(eventType=="musica"){
      return '#E788A1';
    }    
    if(eventType=="cultura"){
      return '#B8957E';
    }    
    if(eventType=="cine"){
      return '#93A4DE';
    }    
    if(eventType=="gastronomia"){
      return '#E38686 ';
    }   
    if(eventType=="ocio"){
      return '#7FC382';
    }    
  }
}
