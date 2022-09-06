import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pit-info',
  templateUrl: './pit-info.page.html',
  styleUrls: ['./pit-info.page.scss'],
})
export class PitInfoPage implements OnInit {
  @Input() turistPointInfo
  constructor() { }

  ngOnInit() {
    console.log("dsadasdasdsat" , this.turistPointInfo)
  }

}
