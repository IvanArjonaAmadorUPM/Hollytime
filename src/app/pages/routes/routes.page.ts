import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {

  routes
  constructor(
    private modalCtrl: ModalController,
    public dataService: DataService
) { }

  ngOnInit() {
    this.getData()
  }
  async getData() {
    this.routes = await this.dataService.getRoutes()
    console.log(this.routes)
    for (var i = 0; i < this.routes.length; i++) {
      console.log(JSON.parse(this.routes[i].route))
    }
  }
}
