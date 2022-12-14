import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { RouteInfoPage } from '../route-info/route-info.page';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {

  areRoutes = false
  data
  routesList
  numRutas
  constructor(
    private modalCtrl: ModalController,
    public dataService: DataService,
    private router: Router,

) { }

  ngOnInit() {
    this.getData()
  }
  async getData() {
    this.data = await this.dataService.getRoutes()
    this.routesList = this.data.map( route =>{
      return JSON.parse(route.route)
    })
    this.routesList = this.routesList.reverse()
    console.log(this.routesList)
    this.numRutas = Object.keys(this.routesList).length;
    this.checkIfRoutes()
  }
  checkIfRoutes() {
    if(this.routesList){
      this.areRoutes=true;
    }
  }
  getTime(route: any) {
    let result = 0.0
    var count = Object.keys(route.movements).length;
    for(let index = 0; index<count ; index++){
      result = result + route.movements[index].distance
    }
    return result.toFixed(1)
    }
    getStops(route){
      return Object.keys(route.stops).length;
    }
    getAccessColor(info){
      if(info){
        return 'green'
      }else return 'red'
    }
    getIconColor(info){
      if(info && info.length!=0){
        return 'green'
      }else return 'red'
    }
    async seeRoute(route){
      const modal = await this.modalCtrl.create({
        component: RouteInfoPage, // abre un componente en un modal
        cssClass: 'cal-modal',
        backdropDismiss: true,
        componentProps: { route }

      });
      modal.present();
      const { data, role } = await modal.onWillDismiss();
      if(role ==="confirm"){
        console.log(confirm)
      }
  
    }
    goToCreateRoute(){
      this.router.navigate(['/time-selector'])
    }
}
