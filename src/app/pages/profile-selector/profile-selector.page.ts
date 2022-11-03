import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.page.html',
  styleUrls: ['./profile-selector.page.scss'],
})
export class ProfileSelectorPage implements OnInit {
  userSelection

  constructor(
    private router: ActivatedRoute,

  ) { }
  
  ngOnInit() {
    
      this.router.queryParams.subscribe(params => {
        this.userSelection = params["time"];
      });
      this.userSelection = JSON.parse(this.userSelection)
    console.log(this.userSelection)
  }

}
