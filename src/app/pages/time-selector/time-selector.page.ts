import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.page.html',
  styleUrls: ['./time-selector.page.scss'],
})
export class TimeSelectorPage implements OnInit {

  hourSelected = null
  daySelected = null
  timeSelected = 0
  userSelection
  status
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onHourChanged($event){
    this.hourSelected = $event.detail.value
    this.hourSelected = this.hourSelected.slice(11,16)
    this.daySelected = $event.detail.value
    this.daySelected = this.daySelected.slice(0,10)
  }
  ontimeChange($event){
    this.timeSelected = $event.detail.value
  }
  checkContinue(){
    this.status = ((this.timeSelected != 0) && this.hourSelected!=null && this.daySelected!=null )
    return !this.status
  }
  timeSelectionComplete(){

    this.userSelection = {
      "hour" : this.hourSelected,
      "day" : this.daySelected,
      "time" : this.timeSelected
    }
    let dataToPass: any = {
      queryParams: {
        time: JSON.stringify(this.userSelection)
      }
    };
    this.router.navigate(['/location-selection'], dataToPass);
  }
}
