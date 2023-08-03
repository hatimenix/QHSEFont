import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  export class AppComponent {
    showSidebar: boolean = true;
    showNavbar : boolean = true;

    constructor(private router: Router) {}
  
    ngOnInit() {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/' || event.url === '/forget-password' || event.url.startsWith('/reset-password/')) {
            this.showSidebar = false;
            this.showNavbar = false;
          } else {
            this.showSidebar = true;
            this.showNavbar = true;
          }
        }
      });
    }
    
  
  }
