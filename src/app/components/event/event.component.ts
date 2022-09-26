import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { ModalController } from '@ionic/angular';
import { EventInfoPage } from 'src/app/pages/event-info/event-info.page';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  @Input() evento;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl : ModalController,
    ) { }

  ngOnInit() {
    this.evento.fechaInicio = formatDate(this.evento.fechaInicio,'dd-MM-yyyy',this.locale)
    this.evento.fechaFin = formatDate(this.evento.fechaFin,'dd-MM-yyyy',this.locale)
  }

  async onSeeMoreClicked(evento){
    const modal = await this.modalCtrl.create({
      component: EventInfoPage, // abre un componente en un modal
      componentProps:{
        evento
      },
      
      breakpoints: [0, 1],
      initialBreakpoint: 0.9,
    });
    modal.present();
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
