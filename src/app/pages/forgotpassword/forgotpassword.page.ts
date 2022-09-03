import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup , PatternValidator, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  sendNewPassword: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formbuilder: FormBuilder
    ) { }

  ngOnInit(){
    this.sendNewPassword = this.formbuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    })
  }

  async onResetPassword(value) {
    try {
      await this.authService.resetPassword(value.email);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }
}
