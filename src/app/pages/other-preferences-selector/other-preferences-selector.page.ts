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
  checkSelected(){
    this.userSelection = {
      ...this.userSelection,
      "accesible": this.accessSelected,
      "food": this.foodTypeSelected,
      "events": this.eventsTypeSelected
    }
    let dataToPass: any = {
      queryParams: {
        time: JSON.stringify(this.userSelection)
      }
    };
    this.routerLink.navigate(['/profile-selector'], dataToPass);
  }
  
}
