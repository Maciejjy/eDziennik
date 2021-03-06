import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements  OnInit {

  showregisterform:boolean=false;

  users:any;

  name:string='';
  nameMsg:string;
  nameB:boolean;
  nameC:number=0;

  lastname:string='';
  lastnameMsg:string;
  lastnameB:boolean;
  lastnameC:number=0;

  email:string='';
  emailMsg:string='';
  emailB:boolean;
  emailC:number=0;

  password:string='';
  passwordMsg:string='';
  passwordB:boolean;
  passwordC:number=0;

  confirmpassword:string='';
  confirmpasswordMsg:string='';
  confirmpasswordB:boolean;
  confirmpasswordC:number=0;


  allValidator:boolean;

  role:string='guest';

  constructor(
    private afAuth: AngularFireAuth,
    private serverService: ServerService,
    private router:Router,
    public flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    setTimeout(()=>{
      if (this.serverService.currentUserMail!='0'){this.router.navigate(['']);}
      this.showregisterform=true;
    },400);
    this.nameValidator();
    this.lastnameValidator();
    this.emailValidator();
    this.passwordValidator();
    this.confirmpasswordValidator();

  }

  nameValidator(){
    if (this.name.length<3){
      this.nameMsg='Imię jest za krótkie';
      this.nameB=true;
      this.nameC = this.nameC+1;
      this.allValidatorF();
    }
    else {
      if (!this.name.match(/^[a-zA-Z]+$/)){
        this.nameMsg='Imię zawiera niedozwolone znaki';
        this.nameB=true;
        this.nameC = this.nameC+1;
        this.allValidatorF();
      }
      else {
        this.nameMsg='';
        this.nameB=false;
        this.allValidatorF();
      }
    }
  }

  lastnameValidator(){
    if (this.lastname.length<3){
      this.lastnameMsg='Nazwisko jest za krótkie';
      this.lastnameB=true;
      this.lastnameC = this.lastnameC+1;
      this.allValidatorF();
    }
    else {
      if (!this.lastname.match(/^[a-zA-Z]+$/)){
        this.lastnameMsg='Nazwisko zawiera niedozwolone znaki';
        this.lastnameB=true;
        this.lastnameC = this.lastnameC+1;
        this.allValidatorF();
      }
      else {
        this.lastnameMsg='';
        this.lastnameB=false;
        this.allValidatorF();
      }
    }
  }

  emailValidator(){
    if (!this.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      this.emailMsg='Email jest nieprawidłowy';
      this.emailB=true;
      this.emailC = this.emailC+1;
      this.allValidatorF();
    }
    else {
      this.emailMsg='';
      this.emailB=false;
      this.allValidatorF();
    }
  }

  passwordValidator(){
    if (this.password.length<6){
      this.passwordMsg='Hasło powinno zawierać conajmniej 6 znaków';
      this.passwordB=true;
      this.passwordC = this.passwordC+1;
      this.allValidatorF();
    }
    else {
      if (!this.password.match(/^[a-z0-9]+$/i)){
        this.passwordMsg='Hasło powinno składać się jedynie ze znaków alfanumerycznych';
        this.passwordB=true;
        this.passwordC = this.passwordC+1;
        this.allValidatorF();
      }
      else {
        this.passwordMsg='';
        this.passwordB=false;
        this.allValidatorF();
      }
    }
  }

  confirmpasswordValidator(){
    if (this.confirmpassword.length<6){
      this.confirmpasswordMsg='Hasła są niezgodne';
      this.confirmpasswordB=true;
      this.confirmpasswordC = this.confirmpasswordC+1;
      this.allValidatorF();
    }
    else {
      if(!(this.confirmpassword==this.password)){
        this.confirmpasswordMsg='Hasła są niezgodne';
        this.confirmpasswordB=true;
        this.allValidatorF();
      } else {
        this.confirmpasswordMsg='';
        this.confirmpasswordB=false;
        this.allValidatorF();
      }
    }
  }


  allValidatorF(){
    if (this.nameB == true || this.lastnameB==true || this.emailB==true || this.passwordB==true || this.confirmpasswordB==true){
      this.allValidator=true
    } else {
      this.allValidator=false;
    }
  }


  onRegisterSubmit( email, password) {
    if (this.password === this.confirmpassword){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        let errorMessage = error.message;
        if (errorMessage == "Password should be at least 6 characters") {
          alert('Hasło powinno składać się z co najmniej 6 znaków');
        }
        if (errorMessage == "The email address is already in use by another account.") {
          alert('Podany adres e-mail jest już używany przez innego użytkownika');
        }
        if (errorMessage == "The email address is badly formatted.") {
          alert('Podany adres e-mail jest nieprawidłowy');

        }
      });
    setTimeout(()=>{
      if(this.serverService.currentUserMail.length>2){
          this.serverService.getUsers().subscribe(users => {
            this.users = users;
          });
          this.serverService.addUser(
            {
              name: this.name,
              lastname: this.lastname,
              email: this.email,
              role: this.role
            }
          );
          this.router.navigate(['']);
          this.flashMessage.show('Rejestracja zakończona sukcesem',
            {cssClass: 'alert-success', timeout: 3000});
      }
    },2000);
  }
  else{
      alert('Podane hasła są niezgodne');
    }
  }
}
