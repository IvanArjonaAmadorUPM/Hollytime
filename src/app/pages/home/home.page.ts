import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user$ = this.auth.user;

  constructor(
    private authService: AuthService,
    private readonly auth: AngularFireAuth
  ) { }

  async ngOnInit() {

    const us = await this.authService.getCurrentUser().then()
    console.log(us) 
  }

}
