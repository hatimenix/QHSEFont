import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() showNavbar: boolean | undefined;
  user: UserApp | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadUser().subscribe(
      (users: UserApp[]) => {
        if (users.length > 0) {
          this.user = users[0];
          console.log("L'utilisateur connecté est :", this.user);
          console.log("Le nom de l'utilisateur est :", this.user?.nom_complet);
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  

  onLogout(): void {
    this.authService.logout();
  }
}
