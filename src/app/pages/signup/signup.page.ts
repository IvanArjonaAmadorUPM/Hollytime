import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AbstractControl, FormBuilder, FormControl, FormGroup , PatternValidator, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { RegisterService  } from 'src/app/services/register.service';
import { getAuth } from "firebase/auth";
import * as firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  axy;

  private authProvider: any;
  
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private registerService: RegisterService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    ) { }

  validationUserMessage = {
    email:[
      {type:"required" , message:"Introduce tu correo"},
      {type:"pattern" , message:"Introduce un correo válido"}
    ],
    password:[
      {type:"minlength" , message:"La longitud debe ser al menos 6 caracteres"},
      {type:"required" , message:"Introduce tu contraseña"}
    ],
    passwordRepited:[
      {type:"required" , message:"Las contraseñas no coinciden"}
    ]
  }

  validationFormUser: FormGroup;
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let password = group.get('password').value;
    let passwordRepited = group.get('passwordRepited').value
    return password === passwordRepited ? null : { notSame: true }
  }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      passwordRepited: ['']
    },{ validators: this.checkPasswords }
    )
  }
  registerUser(value){
    let user;
    try {
      this.registerService.registerFireWithEmail(value).then( response =>{
        user=response
        console.log(user)
        if(user){
          this.router.navigate(['/home'])
      }
        }
        )
    } catch (error) {
      console.log(error)
    }
  }
  onRegisterButton(){
    console.log("register")
  }
  onFacebookButton(){
    console.log("facebook");
  }
  async onGoogleButton(){
    try {
      const user = await this.authService.onLoginGoogle();
      if(user){
        console.log(user)
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error)
    }
  }
  onSignInButton(){
    this.router.navigate(['/login'])
  }
}
