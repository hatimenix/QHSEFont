import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QHSEFrontAngular';
  showSidebar: boolean = false;
  isLoginPage: boolean = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
