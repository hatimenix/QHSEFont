import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showSidebar: boolean = true;
  showNavbar : boolean = true;
  
  constructor(private router: Router) {}


  getCurrentUrl(): string {
      return this.router.url;
    }

  ngOnInit() {
    if(this.getCurrentUrl() == '/'){
      this.showSidebar = false;
      this.showNavbar = false;
    }
    console.log(this.getCurrentUrl());
  }
}


