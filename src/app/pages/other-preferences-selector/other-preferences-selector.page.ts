import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-other-preferences-selector',
  templateUrl: './other-preferences-selector.page.html',
  styleUrls: ['./other-preferences-selector.page.scss'],
})
export class OtherPreferencesSelectorPage implements OnInit {
  accessSelected = false
  foodSelected = false
  eventsSelected = false
  userSelection
  foodHourSelected
  foodTypeSelected = []
  eventsTypeSelected = []
  constructor(
    private router: ActivatedRoute,
    private routerLink: Router,
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.userSelection = params["time"];
    });
    this.userSelection = JSON.parse(this.userSelection)
  }

  onAccessChange(){
    this.accessSelected = !!!this.accessSelected
  }
  onFoodChange(){
    this.foodSelected = !!!this.foodSelected
    if(!this.foodSelected){
      this.foodTypeSelected = []
    }
  }
  onEventChange(){
    this.eventsSelected = !!!this.eventsSelected
    if(!this.eventsSelected){
      this.eventsTypeSelected = []
    }
  }
  foodStyleSelected(typeSelected){
    if(this.foodTypeSelected.includes(typeSelected)){
      this.foodTypeSelected = this.foodTypeSelected.filter(function(item) {
        return item !== typeSelected
    })
    }else {
      this.foodTypeSelected.push(typeSelected)
    }
  }
  eventsStyleSelected(typeSelected){
    if(this.eventsTypeSelected.includes(typeSelected)){
      this.eventsTypeSelected = this.eventsTypeSelected.filter(function(item) {
        return item !== typeSelected
    })
    }else {
      this.eventsTypeSelected.push(typeSelected)
    }
  }
  onHourChanged($event){
    this.foodHourSelected = $event.detail.value
    this.foodHourSelected = this.foodHourSelected.slice(11,16)
    console.log(this.foodHourSelected)
  }
  checkSelected(){
    this.userSelection = {
      ...this.userSelection,
      "accesible": this.accessSelected,
      "food": this.foodTypeSelected,
      "events": this.eventsTypeSelected,
      "foodTime":this.foodHourSelected
    }
    let dataToPass: any = {
      queryParams: {
        time: JSON.stringify(this.userSelection)
      }
    };
    this.routerLink.navigate(['/profile-selector'], dataToPass);
  }
  
}
