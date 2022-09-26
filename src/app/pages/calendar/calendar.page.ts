import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { EventInfoPage } from '../event-info/event-info.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  eventSource = []
  viewTitle: string;
  calendar = {
    locale: 'es',
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @Input() eventsToCalendar
  @Input() events

  constructor(
    private modalCtrl : ModalController,

  ) {
    
   }

  modalReady = false;

  ngOnInit() {
    this.eventSource = this.eventsToCalendar
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.modalReady = true;
    },0)
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onEventSelected = async (event) => {
    let evento
    this.events.map(item =>{
      if(item.nombre == event.title){
        evento = item;
      }
    })
    console.log(evento)
      const modal = await this.modalCtrl.create({
        component: EventInfoPage, // abre un componente en un modal
        componentProps:{
          evento
        },
        
        breakpoints: [0, 1],
        initialBreakpoint: 0.9,
      });
      modal.present();
    
};
}
