import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-preferences-selector',
  templateUrl: './other-preferences-selector.page.html',
  styleUrls: ['./other-preferences-selector.page.scss'],
})
export class OtherPreferencesSelectorPage implements OnInit {

  constructor(
    private router: ActivatedRoute,

  ) { }
  userSelection
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.userSelection = params["time"];
    });
    this.userSelection = JSON.parse(this.userSelection)
  }

}
