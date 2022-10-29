import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AlertController, IonSelect, ModalController } from '@ionic/angular';
import { CalendarPage } from '../calendar/calendar.page';

import { ActionSheetController } from '@ionic/angular';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  loading = true;
  eventsToCalendar = []
  numberEventsShown = 5;
  eventsSliced = []
  // [{
  //   title: 'Mercadillo Medieval', 
  //   startTime : new Date(
  //     Date.UTC(2022, 8, 10, 16)
  // ) ,
  // endTime: new Date(
  //   Date.UTC(2022, 8, 13 , 18)
  // ) ,
  // allDay: false
  // }]


  events:any
  eventosDeEjemplo = [{
    identificador: 1,
    nombre: 'Mercado Cervantino',
    descripcionBreve : 'Vuelve el Mercado Cervantino 2022 al centro histórico de Alcalá de Henares enmarcado de nuevo dentro de la Semana Cervantina, acontecimiento de Interés Turístico Nacional. Es el mercado de época más grande de Europa y uno de los más importantes del mundo.',
    descripcionExtensa: ' Volvemos al casco histórico de Alcalá de Henares, volvemos a nuestra casa. El Mercado Cervantino se presenta con novedades, aunque en esencia mantiene su esquema habitual y su apuesta por los personajes cervantinos. Para esta edición y para las próximas, en el imaginario de esta actividad se han sumado unas simbólicas imágenes del dibujante Max Hierro. A su espléndido Quijote, que servirá para ilustrar el cartel del Mercado Cervantino 2022, se le sumarán otros personajes icónicos del universo cervantino como Blanca Luna, Princesa Micomicona, Rinconete y Cortadillo, Dulcinea, Preciosa o Vidriera, entre otros, y se apostará por reforzar la imagen de uno de los mercados que marcan la referencia en nuestro país; Plaza de San Diego, Plaza de Cervantes, Plaza de los Santos Niños o Plaza de Palacio, Calle Mayor, Calle de San Juan o Calle de Sandoval y Rojas forman parte del escenario habitual que transportan prácticamente al Siglo de Oro a una ciudad con una clara devoción cervantina. Los torneos de Caballeros, que vivirán una evolución en esta nueva edición, se realizarán una vez más en el Recinto Amurallado del Palacio Arzobispal. ',
    direccion : 'Calle Mayor',
    numero: 's/n',
    urlImagen : 'https://www.dream-alcala.com/wp-content/uploads/2022/09/Programa-Mercado-Cervantino-2022-Dream-Alcala-1024x576.jpg',
    urlSitio: 'https://www.mercadocervantino.es/Mercado_Cervantino/Bienvenida.html',
    geolocalización: '',
    accesible : true,
    tipo : 'especial',
    precio: 'Gratis',
    fechaInicio:new Date(
      Date.UTC(2022, 9, 10)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 9, 12)
  ),
    horaInicio:'Todo el día',
    horaFinal:'Todo el día',
    perfil:'Todos'
  },
  {
    identificador: 2,
    nombre: 'II Feria del marisco',
    descripcionBreve : 'Visita la feria del marisco en el recinto ferial',
    descripcionExtensa: ' Volvemos al casco histórico de Alcalá de Henares, volvemos a nuestra casa. El Mercado Cervantino se presenta con novedades, aunque en esencia mantiene su esquema habitual y su apuesta por los personajes cervantinos. Para esta edición y para las próximas, en el imaginario de esta actividad se han sumado unas simbólicas imágenes del dibujante Max Hierro. A su espléndido Quijote, que servirá para ilustrar el cartel del Mercado Cervantino 2022, se le sumarán otros personajes icónicos del universo cervantino como Blanca Luna, Princesa Micomicona, Rinconete y Cortadillo, Dulcinea, Preciosa o Vidriera, entre otros, y se apostará por reforzar la imagen de uno de los mercados que marcan la referencia en nuestro país; Plaza de San Diego, Plaza de Cervantes, Plaza de los Santos Niños o Plaza de Palacio, Calle Mayor, Calle de San Juan o Calle de Sandoval y Rojas forman parte del escenario habitual que transportan prácticamente al Siglo de Oro a una ciudad con una clara devoción cervantina. Los torneos de Caballeros, que vivirán una evolución en esta nueva edición, se realizarán una vez más en el Recinto Amurallado del Palacio Arzobispal. ',
    direccion : 'Recinto ferial',
    numero: 's/n',
    urlImagen : 'https://www.dream-alcala.com/wp-content/uploads/2016/04/ii-feria-marisco-gallego-alcala-de-henares-800x480.jpg',
    urlSitio: 'https://www.mercadocervantino.es/Mercado_Cervantino/Bienvenida.html',
    geolocalización: '',
    accesible : true,
    tipo : 'gastronomia',
    precio: 'Gratis',
    fechaInicio:new Date(
      Date.UTC(2022, 10, 7, 16)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 10, 10, 18)
  ),
    horaInicio: '18:00',
    horaFinal:'20:00',
    perfil:'Adultos'
  },
  {
    identificador: 1,
    nombre: 'KM 0',
    descripcionBreve : 'La ciudad cervantina es el epicentro de las dos ruedas con esta gran concentración de motos y marcas que pone sus motores en marcha este viernes.',
    descripcionExtensa: ' Volvemos al casco histórico de Alcalá de Henares, volvemos a nuestra casa. El Mercado Cervantino se presenta con novedades, aunque en esencia mantiene su esquema habitual y su apuesta por los personajes cervantinos. Para esta edición y para las próximas, en el imaginario de esta actividad se han sumado unas simbólicas imágenes del dibujante Max Hierro. A su espléndido Quijote, que servirá para ilustrar el cartel del Mercado Cervantino 2022, se le sumarán otros personajes icónicos del universo cervantino como Blanca Luna, Princesa Micomicona, Rinconete y Cortadillo, Dulcinea, Preciosa o Vidriera, entre otros, y se apostará por reforzar la imagen de uno de los mercados que marcan la referencia en nuestro país; Plaza de San Diego, Plaza de Cervantes, Plaza de los Santos Niños o Plaza de Palacio, Calle Mayor, Calle de San Juan o Calle de Sandoval y Rojas forman parte del escenario habitual que transportan prácticamente al Siglo de Oro a una ciudad con una clara devoción cervantina. Los torneos de Caballeros, que vivirán una evolución en esta nueva edición, se realizarán una vez más en el Recinto Amurallado del Palacio Arzobispal. ',
    direccion : 'Calle Mayor',
    numero: 's/n',
    urlImagen : 'https://www.dream-alcala.com/wp-content/uploads/2022/09/xtreme_challengue1-1024x576.jpg',
    urlSitio: 'https://www.dream-alcala.com/xtreme-challenge-la-gran-cita-del-mototurismo-arranca-en-alcala-de-henares/',
    geolocalización: '',
    accesible : false,
    tipo : 'deporte',
    precio: 'Gratis',
    fechaInicio:new Date(
      Date.UTC(2022, 9, 22 , 11)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 9, 23, 18)
  ),
    horaInicio: '13:00',
    horaFinal:'20:00',
    perfil:'Jovenes'
  },
  {
    identificador: 1,
    nombre: 'LA PANADERA',
    descripcionBreve : 'La panadera cuenta la historia de Concha, una mujer de cuarenta años, encargada de una panadería',
    descripcionExtensa: ' Volvemos al casco histórico de Alcalá de Henares, volvemos a nuestra casa. El Mercado Cervantino se presenta con novedades, aunque en esencia mantiene su esquema habitual y su apuesta por los personajes cervantinos. Para esta edición y para las próximas, en el imaginario de esta actividad se han sumado unas simbólicas imágenes del dibujante Max Hierro. A su espléndido Quijote, que servirá para ilustrar el cartel del Mercado Cervantino 2022, se le sumarán otros personajes icónicos del universo cervantino como Blanca Luna, Princesa Micomicona, Rinconete y Cortadillo, Dulcinea, Preciosa o Vidriera, entre otros, y se apostará por reforzar la imagen de uno de los mercados que marcan la referencia en nuestro país; Plaza de San Diego, Plaza de Cervantes, Plaza de los Santos Niños o Plaza de Palacio, Calle Mayor, Calle de San Juan o Calle de Sandoval y Rojas forman parte del escenario habitual que transportan prácticamente al Siglo de Oro a una ciudad con una clara devoción cervantina. Los torneos de Caballeros, que vivirán una evolución en esta nueva edición, se realizarán una vez más en el Recinto Amurallado del Palacio Arzobispal. ',
    direccion : 'Calle Mayor',
    numero: 's/n',
    urlImagen : 'https://culturalcala.es/wp-content/uploads/2022/09/la-panadera-1-300x200.jpeg',
    urlSitio: 'www.iriaproducciones.com',
    geolocalización: '',
    accesible : true,
    tipo : 'cultura',
    precio: '16',
    fechaInicio:new Date(
      Date.UTC(2022, 9, 22, 14)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 9, 22, 20)
  ),
    horaInicio:'16:00',
    horaFinal:'22:00',
    perfil:'Todos'
  },
  {
    identificador: 1,
    nombre: 'Fiestas santos Niños',
    descripcionBreve : 'Evento para niños en la plaza de los Santos Niños',
    descripcionExtensa : 'Evento para niños en la plaza de los Santos Niños',
    direccion : 'Santos Niños',
    numero: 's/n',
    urlImagen : 'https://www.dream-alcala.com/wp-content/uploads/2022/07/CARTEL-FIESTAS-DISTRITO-SANTOS-NINOS-2022.jpg',
    urlSitio: 'https://www.mercadocervantino.es/Mercado_Cervantino/Bienvenida.html',
    geolocalización: '',
    accesible : true,
    tipo : 'ocio',
    precio: 'Gratis',
    fechaInicio:new Date(
      Date.UTC(2022, 9, 1, 8)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 9, 1, 10)
  ),
    horaInicio: '10:00',
    horaFinal:'12:00',
    perfil:'Niños'
  },
  {
    identificador: 1,
    nombre: 'La MODA',
    descripcionBreve : 'Disfruta del ultimo concierto de la gira mundial de La MODA',
    descripcionExtensa: ' Volvemos al casco histórico de Alcalá de Henares, volvemos a nuestra casa. El Mercado Cervantino se presenta con novedades, aunque en esencia mantiene su esquema habitual y su apuesta por los personajes cervantinos. Para esta edición y para las próximas, en el imaginario de esta actividad se han sumado unas simbólicas imágenes del dibujante Max Hierro. A su espléndido Quijote, que servirá para ilustrar el cartel del Mercado Cervantino 2022, se le sumarán otros personajes icónicos del universo cervantino como Blanca Luna, Princesa Micomicona, Rinconete y Cortadillo, Dulcinea, Preciosa o Vidriera, entre otros, y se apostará por reforzar la imagen de uno de los mercados que marcan la referencia en nuestro país; Plaza de San Diego, Plaza de Cervantes, Plaza de los Santos Niños o Plaza de Palacio, Calle Mayor, Calle de San Juan o Calle de Sandoval y Rojas forman parte del escenario habitual que transportan prácticamente al Siglo de Oro a una ciudad con una clara devoción cervantina. Los torneos de Caballeros, que vivirán una evolución en esta nueva edición, se realizarán una vez más en el Recinto Amurallado del Palacio Arzobispal. ',
    direccion : 'Palacio Arzobispal',
    numero: 's/n',
    urlImagen : 'https://media.timeout.com/images/105786439/image.jpg',
    urlSitio: 'https://www.mercadocervantino.es/Mercado_Cervantino/Bienvenida.html',
    geolocalización: '',
    accesible : true,
    tipo : 'musica',
    precio: '20',
    fechaInicio:new Date(
      Date.UTC(2022, 9, 22, 19)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 9, 22, 21)
  ),
    horaInicio: '21:00',
    horaFinal:'00:00',
    perfil:'Jovenes'
  },
  {
    identificador: 1,
    nombre: 'Festival de Cine de Alcalá de Henares',
    descripcionBreve : 'Vive el mayor festival de cine de la ciudad. Podrás disfrutar de estrenos, cortos y de la presencia de muchos actores',
    descripcionExtensa : 'Vive el mayor festival de cine de la ciudad. Podrás disfrutar de estrenos, cortos y de la presencia de muchos actores',
    direccion : 'Teatro Cervantes',
    numero: 's/n',
    urlImagen : 'https://upload.wikimedia.org/wikipedia/commons/3/33/Festival_de_Cine_de_Alcal%C3%A1_de_Henares_%282002%29_ALCINE%2C_logotipo.png',
    urlSitio: 'https://es.wikipedia.org/wiki/Festival_de_Cine_de_Alcal%C3%A1_de_Henares',
    geolocalización: '',
    accesible : false,
    tipo : 'cine',
    precio: 'Gratis',
    fechaInicio:new Date(
      Date.UTC(2022, 8, 30)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 9, 4)
  ),
    horaInicio: 'Todo el dia',
    horaFinal:'Todo el dia',
    perfil:'Todos'
  },
  {
    identificador: 1,
    nombre: 'Ferias Alcalá de Henares',
    descripcionBreve : 'Como todos los años, ven a montar en las atracciones y a disfrutar en una de la mayores ferias de la región',
    descripcionExtensa : 'Como todos los años, ven a montar en las atracciones y a disfrutar en una de la mayores ferias de la región',
    direccion : 'Recinto ferial',
    numero: 's/n',
    urlImagen : 'https://www.dream-alcala.com/wp-content/uploads/2014/08/Recinto-Ferial-de-Alcal%C3%A1-2014-17-e1471600427301.jpg',
    urlSitio: 'https://www.mercadocervantino.es/Mercado_Cervantino/Bienvenida.html',
    geolocalización: '',
    accesible : true,
    tipo : 'ocio',
    precio: 'Gratis',
    fechaInicio:new Date(
      Date.UTC(2022, 11, 1)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 11, 28)
  ),
    horaInicio: 'Todo el dia',
    horaFinal:'Todo el dia',
    perfil:'Familiar'
  },
  {
    identificador: 1,
    nombre: 'Semana del mayor',
    descripcionBreve : 'Diversos juegos en la plaza mayor para nuestros mayores',
    descripcionExtensa : 'Diversos juegos en la plaza mayor para nuestros mayores',
    direccion : 'Plaza cervantes',
    numero: 's/n',
    urlImagen : 'https://www.dream-alcala.com/wp-content/uploads/2021/08/semana_mayor.jpg',
    urlSitio: 'https://www.mercadocervantino.es/Mercado_Cervantino/Bienvenida.html',
    geolocalización: '',
    accesible : true,
    tipo : 'cultura',
    precio: '15',
    fechaInicio:new Date(
      Date.UTC(2022, 10, 5)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 10, 9)
  ),
    horaInicio: 'Todo el dia',
    horaFinal:'Todo el dia',
    perfil:'Mayores'
  },
  {
    identificador: 1,
    nombre: 'Scape Room Alcala',
    descripcionBreve : 'Escapa de la ciudad en un renovaod escape room urbano',
    descripcionExtensa : 'Escapa de la ciudad en un renovaod escape room urbano',
    direccion : 'Calle del tinte',
    numero: '32',
    urlImagen : 'https://escapecitybox.com/wp-content/uploads/2021/03/IG-1-ALCALA.jpg',
    urlSitio: 'https://www.mercadocervantino.es/Mercado_Cervantino/Bienvenida.html',
    geolocalización: '',
    accesible : false,
    tipo : 'ocio',
    precio: '7',
    fechaInicio:new Date(
      Date.UTC(2022, 10, 5, 18)
  ),
    fechaFin:new Date(
      Date.UTC(2022, 10, 9, 20)
  ),
    horaInicio: '20:00',
    horaFinal:'22:00',
    perfil:'Amigos'
  },
]

  constructor(
    public actionSheetCtrl: 
    ActionSheetController,
    private modalCtrl: ModalController,
    public dataService: DataService
    ) { }

  ngOnInit() {
    this.getData()
  }
  async getData() {
    this.events = await this.dataService.getEvents()
    this.convertEventDateTipe()
    this.createEventsToShow()
    this.createEventsToCalendar()

    setTimeout(() => {
      this.loading=false
      ; }, 1500);
  }
  convertEventDateTipe() {
    this.events?.map(event=>{
      let initDay = event?.fechaInicio?.at(0)
      let initMonth = event?.fechaInicio?.at(1)-1
      let inityear = event?.fechaInicio?.at(2)
      let initHour = event?.fechaInicio?.at(3)

      let finishDay = event?.fechaFin?.at(0)
      let finishMonth = event?.fechaFin?.at(1)-1 
      let finishYear = event?.fechaFin?.at(2)
      let finishHour = event?.fechaFin?.at(3)

    if(initHour==null){
      let initDate =
      new Date(
        Date.UTC(inityear, initMonth,initDay)
      )
      let finishDate =
      new Date(
        Date.UTC(finishYear,finishMonth, finishDay)
      )
      event.fechaInicio = initDate
      event.fechaFin = finishDate
    }else{
      let initDate =
      new Date(
        Date.UTC(inityear,initMonth,initDay,initHour-2)
      )
      let finishDate =
      new Date(
        Date.UTC(finishYear,finishMonth,finishDay,finishHour-2)
      )
      event.fechaInicio = initDate
      event.fechaFin = finishDate
    }

    })
  }
  createEventsToShow() {
    this.eventsSliced = this.events.slice(0,this.numberEventsShown)
  }

  async displaySelectionList(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Ordenar eventos',
      buttons: [
        {
          text: 'Ordenar por fecha',
          icon: 'calendar-number-outline',
          handler: () =>{
            console.log("fehca")
          }
        },
        {
          text: 'Eventos importantes primero',
          icon: 'diamond-outline',
          handler: () =>{
            console.log("diamante")
          }
        },
        {
          text: 'Ordenar por eventos',
          icon: 'apps-outline',
          handler: () =>{
            console.log("eventos")
          }
        },
        {
          text: 'Volver',
          role: 'cancel',
          icon: 'close',
        },
      ],
      cssClass: 'my-custom-class',
      animated: true,
      backdropDismiss: true,
      keyboardClose: false,
      translucent: false,
    });
    actionSheet.present();
  }

  createEventsToCalendar(){
    let eventAuxiliar;
    this.events.map(event =>{
      eventAuxiliar = {
        title: event.nombre,
        startTime: event.fechaInicio,
        endTime: event.fechaFin,
        allDay: event.horaInicio == event.horaFinal
      }
      this.eventsToCalendar.push(eventAuxiliar)
    })
  }
  setOrder(typeSelected){
    console.log(typeSelected)
  }
  async openCalendar(eventsToCalendar,events) {
    eventsToCalendar = this.eventsToCalendar
    events = this.events
    const modal = await this.modalCtrl.create({
      component: CalendarPage,
      componentProps:{
        eventsToCalendar,
        events
      },
      cssClass: 'cal-modal',
      backdropDismiss: true
    });
  
    await modal.present();
  }

  loadMoreData(event){
    setTimeout(()=>{
      const arrAux = this.events.slice(this.numberEventsShown,this.numberEventsShown + 5)
      this.eventsSliced.push(... arrAux)
      this.numberEventsShown = this.numberEventsShown + 5;
      event.target.complete();
    }, 1000)
  }

}
