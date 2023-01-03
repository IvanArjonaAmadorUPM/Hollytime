import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.page.html',
  styleUrls: ['./profile-selector.page.scss'],
})
export class ProfileSelectorPage implements OnInit {
  loading = false
  isPopOverOpen = false
  resultText
  response
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
user
  constructor(
    private router: ActivatedRoute,
    private readonly auth: AngularFireAuth,
    private authService: AuthService,
    private routerToHome: Router,


  ) { }
  
  async ngOnInit() {
      this.getUser()
      this.router.queryParams.subscribe(params => {
        this.userSelection = params["time"];
      });
      this.userSelection = JSON.parse(this.userSelection)
  }
  async getUser() {
    this.user = await this.authService.getCurrentUser().then();
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
      "profiles": this.finalProfileSelected,
      "userEmail": this.user['email']

    }
    this.makeRequest(this.userSelection);
  }

  makeRequest(userSelection) {
    let serverurl = 'http://localhost:8080/api/getRoute'
    this.loading=true;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userSelection)
    };
    console.log(requestOptions)
    console.log(userSelection)
      fetch(serverurl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.resultText="Ruta obtenida con éxito. Podrás ver tu ruta en el apartado 'Mis rutas' "
        this.loading = false
        this.isPopOverOpen = true
      })
      .catch((error) => {
        this.resultText="Ha habido un error, inténtelo más tarde"
        this.loading = false
        this.isPopOverOpen = true
      });
  }

  getFinalPreferencesSelected() {
    this.currentProfile.map((selected,index)=>{
      if(selected){
        this.finalProfileSelected.push(this.profileTypes[index].name)
      }
    })
  }

  popOverDismiss(){
    this.isPopOverOpen = false
    this.routerToHome.navigate(['/home'])
  }
}
