import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.page.html',
  styleUrls: ['./profile-selector.page.scss'],
})
export class ProfileSelectorPage implements OnInit {
  userSelection
  finalProfileSelected = []
  profileTypes=[{
    name: 'Familiar',
    url: 'https://images.pexels.com/photos/1682497/pexels-photo-1682497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'Familiar',
  },
  {
    name: 'Amigos',
    url: 'https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'Amigos',
  },
  {
    name: 'Mayores',
    url: 'https://images.pexels.com/photos/69415/elderly-old-recreation-elderly-couple-69415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'Mayores',
  },
  {
    name: 'Infantil',
    url: 'https://images.pexels.com/photos/1094072/pexels-photo-1094072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'infantil',
  },
  {
    name: 'Solo',
    url: 'https://images.pexels.com/photos/2272940/pexels-photo-2272940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'Solo',
  },
  {
    name: 'Joven',
    url: 'https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'Joven',
  },
];
buttonDisabled = true
currentProfile = new Array(this.profileTypes.length);
  constructor(
    private router: ActivatedRoute,

  ) { }
  
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
    this.currentProfile[index] = !!!this.currentProfile[index];
    this.checkDisable()
   }
   checkDisable(){
    this.currentProfile.map((selected)=>{
      if(selected){
        this.buttonDisabled = false
      }
    })
    if(this.currentProfile.every(selected => selected === false)){
      this.buttonDisabled = true
    }
  }
  checkSelected(){
    this.getFinalPreferencesSelected()
    this.userSelection = {
      ...this.userSelection,
      "profiles": this.finalProfileSelected
    }
    let dataToPass: any = {
      queryParams: {
        time: JSON.stringify(this.userSelection)
      }
    };
    console.log(this.userSelection)
  }

  getFinalPreferencesSelected() {
    this.currentProfile.map((selected,index)=>{
      if(selected){
        this.finalProfileSelected.push(this.profileTypes[index].name)
      }
    })
  }
}
