import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-preferences-selector',
  templateUrl: './preferences-selector.page.html',
  styleUrls: ['./preferences-selector.page.scss'],
})
export class PreferencesSelectorPage implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private routerLink: Router
  ) { }
  userSelection
  finalPreferenceSelected = []
  preferencesTypes=[{
    name: 'Museos',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Museo_Arqueol%C3%B3gico_Regional_CAM.JPG',
    alt: 'Museo',
  },
  {
    name: 'Arqueología',
    url: 'https://culturalcala.es/wp-content/uploads/2017/05/ciudad-romana-complutum-4.jpg',
    alt: 'Museo',
  },
  {
    name: 'Monumentos',
    url: 'https://www.dream-alcala.com/wp-content/uploads/2015/05/Alcala-Plaza-de-Cervantes.jpg',
    alt: 'Museo',
  },
  {
    name: 'Edificios',
    url: 'https://culturalcala.es/wp-content/uploads/2015/04/Universidad-de-Alcala.jpg',
    alt: 'Edificio',
  },
  {
    name: 'Torres',
    url: 'https://www.turismoalcala.es/wp-content/uploads/2017/01/torreMagistarl.jpg',
    alt: 'Torre',
  },
  {
    name: 'Religioso',
    url: 'https://lacallemayor.net/wp-content/uploads/magistral-interior.jpg',
    alt: 'Catedral',
  },
];
  buttonDisabled = true
  currentPreferencesSelected = new Array(this.preferencesTypes.length);
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.userSelection = params["time"];
     
    });
    this.userSelection = JSON.parse(this.userSelection)
  }


  handleClick(index: number) {
   // the double bang evaluates null/undefined to falsey
   // so you get the initial value set
   // the third bang correctly toggles the value
   this.currentPreferencesSelected[index] = !!!this.currentPreferencesSelected[index];
   this.checkDisable()
  }

  checkSelected(){
    this.getFinalPreferencesSelected()
    this.userSelection = {
      ...this.userSelection,
      "preferences": this.finalPreferenceSelected
    }
    let dataToPass: any = {
      queryParams: {
        time: JSON.stringify(this.userSelection)
      }
    };
    this.routerLink.navigate(['/other-preferences-selector'], dataToPass);

  }
  getFinalPreferencesSelected() {
    this.currentPreferencesSelected.map((selected,index)=>{
      if(selected){
        this.finalPreferenceSelected.push(this.preferencesTypes[index].name)
      }
    })
  }

  checkDisable(){
    this.currentPreferencesSelected.map((selected)=>{
      if(selected){
        this.buttonDisabled = false
      }
    })
    if(this.currentPreferencesSelected.every(selected => selected === false)){
      this.buttonDisabled = true
    }
  }
}
