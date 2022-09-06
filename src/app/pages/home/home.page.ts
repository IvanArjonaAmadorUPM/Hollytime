import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user$ = this.auth.user;

  constructor(
    private authService: AuthService,
    private readonly auth: AngularFireAuth,
    private router: Router,
  ) { }

  async ngOnInit() {

    const us = await this.authService.getCurrentUser().then()
    console.log(us) 
  }

  onMapClick(){
    this.router.navigate(['/map'])

  }

}
