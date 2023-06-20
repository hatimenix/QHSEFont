import { Component, Input } from '@angular/core';
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
  user: UserApp  |null = null
  group : GroupeUser | null=null
  id!:any

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
    // this.getGroupDetails();
    
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
// getGroupDetails(): void {
//   this.authService.getGroupDetails().subscribe(
//     (response: GroupeUser ) => {
//       this.group = response;
//       console.log('Group details:', this.group);
//     },
//     (error: any) => {
//       console.error( error);
//     }
//   );
// }

  
  
  
  onLogout(): void {
    this.authService.logout();
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/']);
  }
 

  
  
}
