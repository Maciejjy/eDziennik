import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  users:any;
  editInit:boolean;
  selectedUser: User;


  constructor(
    public serverService: ServerService,
    private router:Router,
  ) {}

  ngOnInit() {
    setTimeout(()=>{
      if (!(this.serverService.currentUserRole=='admin')){this.router.navigate(['']);}
    },2000);
    this.serverService.getUsers().subscribe(users =>{
      this.users = users;
    })
  }

  onEditClick(user:User) {
    this.editInit = true;
    this.selectedUser = user;
  }

  onEditSubmit(id, user){
    this.serverService.updateUser(id, user);
    this.editInit=false;
  }

  onDeleteClick(id){
    this.serverService.deleteUser(id);
  }

  CancelEdit(){
    this.editInit = false;
    this.serverService.getUsers().subscribe(users =>{
      this.users = users;
    })
  }

}
