import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http'
import * as firebase from 'firebase'
import { ServerService } from '../server.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages = [];
  tab = [];
  student = firebase.auth().currentUser.email;
  message = '';
  date: any;

  constructor(private server: ServerService, private auth: AuthService, private router: Router, private http: Http) {}

  ngOnInit() {
    if(this.auth.token == null){
      this.router.navigate((['/']));
    }
    this.getMess()
  }

  onSend(form: NgForm) {
    this.tab = [];
    this.student = firebase.auth().currentUser.email;
    this.message = form.value.message;
    this.date = new Date().toLocaleString();
    console.log(this.date);
    if (this.message != ""){
      this.messages.push({author: this.student, datetime: this.date, text: this.message});
      this.server.onSend(this.messages).subscribe(
          () => console.log("1"),
          (error) => console.log(error),
          () => {
            form.resetForm();
            form.value.message = "";
            this.messages = [];
            this.message = "";
            this.getMess();
          })
    }
    else { this.getMess()}
  }

  clear(){
    document.getElementById("message").onreset
  }

  getMess() {
    this.server.getMessages()
        .subscribe(
        (response: Response) => {
          for (let key in response){
            if (response.hasOwnProperty(key)) {
              this.tab.push(response[key][0])
            }
          }
        },
              (error) => console.log(error)
        );
  }
}