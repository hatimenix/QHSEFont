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
  user: any  |null = null
  group : GroupeUser | null=null
  id!:any




  constructor(private authService: AuthService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getUserDetails();
   
  
    
     
    
  }
  
  
  getUserDetails(): void {
    const userImagePath = localStorage.getItem('userImagePath');
    const baseURL = 'https://qhseapi.paiperleckelearning.com/';
  
    this.authService.getUserDetails().subscribe(
      (response: UserApp) => {
        this.user = response;
        console.log('User details:', this.user);
  
        if (userImagePath !== null) {
          this.user.image = `${baseURL}${userImagePath}`;
        } else {
          this.user.image = ''; // Assign a default value when userImagePath is null
        }
  
        // Save the image path to local storage
        localStorage.setItem('userImagePath', userImagePath || '');
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
