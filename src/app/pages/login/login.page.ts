import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , PatternValidator, Validators} from '@angular/forms';
import { Router } from  "@angular/router";
import { AuthService  } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    ) { }

  validationUserMessage = {
    email:[
      {type:"required" , message:"Introduce tu correo"},
      {type:"pattern" , message:"Introduce tu correo"}
    ],
    password:[
      {type:"required" , message:"Introduce tu contraseña"},
      {type:"minlenght" , message:"Introduce tu contraseña"}
    ]
  }

  validationFormUser: FormGroup;


  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
  }

  async loginUser(value){
    try {
      const user = await this.authService.loginFireAuth(value);
      if(user){
        console.log(user)
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error)
    }
  }
  async onGoogleButton(){
    try {
      const user = await this.authService.onLoginGoogle();
      if(user){
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onFacebookButton(){
    try {
      const user = await this.authService.onLoginFacebook();
      if(user){
        console.log(user)
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error)
    }
  }
  onAppleButton(){
    console.log("apple");
  }
  
  onForgotPasswordButton(){
    this.router.navigate(['/forgotpassword'])
  }
  onRegisterButton(){
    this.router.navigate(['/signup'])
  }
}
