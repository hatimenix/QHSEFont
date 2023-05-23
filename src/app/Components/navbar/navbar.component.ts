import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() showNavbar: boolean | undefined;
  user: UserApp  |null = null

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (response: UserApp) => {
        this.user = response;
        console.log('User details:', this.user);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/']);
  }
  
}
