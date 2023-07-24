import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() showNavbar: boolean | undefined;
  user: UserApp | null = null;
  group: GroupeUser | null = null;
  id!: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (response: UserApp) => {
        this.user = response;
        console.log('User details:', this.user);
        this.loadUserImage();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadUserImage(): void {
    if (this.user && this.user.image) {
      const baseURL = 'http://127.0.0.1:8001';
      const imagePath = `${baseURL}${this.user.image}`;
      this.user.image = this.sanitizer.bypassSecurityTrustUrl(imagePath);
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }
}
