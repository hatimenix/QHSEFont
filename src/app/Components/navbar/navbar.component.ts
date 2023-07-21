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
<<<<<<< HEAD
    this.getUserDetails();
  }

=======
    this.getUserDetails(); 
  }
  
>>>>>>> 8a0344f7bad46e6d279762a180b4c1f5f207a2f5
  getUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (response: UserApp) => {
        this.user = response;
        console.log('User details:', this.user);
<<<<<<< HEAD
        this.loadUserImage();
=======
  
        if (userImagePath !== null) {
          this.user.image = `${baseURL}${userImagePath}`;
        } else {
          this.user.image = ''; // Assign a default value when userImagePath is null
        }

        // Save the image path to local storage
        localStorage.setItem('userImagePath', userImagePath || '');
>>>>>>> 8a0344f7bad46e6d279762a180b4c1f5f207a2f5
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
<<<<<<< HEAD

  loadUserImage(): void {
    if (this.user && this.user.image) {
      const baseURL = 'http://127.0.0.1:8001';
      const imagePath = `${baseURL}${this.user.image}`;
      this.user.image = this.sanitizer.bypassSecurityTrustUrl(imagePath);
    }
  }
=======
  
>>>>>>> 8a0344f7bad46e6d279762a180b4c1f5f207a2f5

  onLogout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }
<<<<<<< HEAD
=======
  
>>>>>>> 8a0344f7bad46e6d279762a180b4c1f5f207a2f5
}
