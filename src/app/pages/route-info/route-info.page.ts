import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import pitData from '../../data/PIT.json'
import { PitInfoPage } from '../pit-info/pit-info.page';

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.page.html',
  styleUrls: ['./route-info.page.scss'],
})
export class RouteInfoPage implements OnInit {
  stops
  movements
  ant
  @Input() route
  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    this.stops = this.route.stops
    this.movements = this.route.movements
    this.ant = this.route.ant
    console.log(this.ant)
  }
  getImage(route){
    let pitName = route.value.name
    let pit = this.getPit(pitName)
    if(pit && pit['Complemento']){
      return pit['Complemento']
    }else return "https://img.freepik.com/iconos-gratis/restaurante_318-340074.jpg"
  }

  getPit(name){
    for(var i = 0 ; i<pitData.length;i++){
      if(pitData[i]['Nombre']==name){
        return pitData[i]
      }
    }
  }
   async getPitInfo(stop){
    let pitName = stop.value.name
    const turistPointInfo = this.getPit(pitName)
    if(turistPointInfo){
    const modal =  await this.modalCtrl.create({
      component: PitInfoPage,
      componentProps: {turistPointInfo},
      breakpoints: [0, 1],
      initialBreakpoint: 0.9,
    });
    modal.present();
  }
  }
}
