import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if(this.auth.token == null){
      this.router.navigate((['/']));
    }
  }

}

