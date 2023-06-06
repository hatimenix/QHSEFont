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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
    
  }

  getUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (response: UserApp) => {
        this.user = response;
        console.log('User details:', this.user);
  
        // Check if the user has a group assigned
        if (this.user?.groupes_roles?.length) {
          const groupeUser: GroupeUser = this.user.groupes_roles[0]; // Assuming only one group is assigned to the user
          const groupId: number = groupeUser.id; // Extract the 'id' property as a number
  
          // Check if groupId is defined before making the API request
          if (groupId !== undefined) {
            this.authService.getGroupDetails(groupId).subscribe(
              (groupDetails: any) => {
                const autorisation = groupDetails.autorisation;
                console.log('Group autorisation:', autorisation);
                // Do whatever you need to do with the "autorisation" field here
              },
              (error: any) => {
                console.error('Error retrieving group details:', error);
              }
            );
          }
        }
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
