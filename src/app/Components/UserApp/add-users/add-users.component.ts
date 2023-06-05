import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { PermissionService } from 'src/app/Services/Service-permission/permission.service';
import { GroupeUserService } from 'src/app/Services/Services-GroupesUser/groupe-user.service';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  userForm!: FormGroup;
  groupes!: GroupeUser[];
 
  
 

  constructor(
    private formBuilder: FormBuilder,
    private userAppService: UsersService,
    private groupeUserService: GroupeUserService,
    private router: Router,
    private http: HttpClient, 
    private permissionService: PermissionService

     
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nom_user: ['', Validators.required],
      nom_complet: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      actif: [true],
      groupes_roles: this.formBuilder.array([]), 
      send_email: [false],
    });

    this.loadGroupes();
  }

  loadGroupes() {
    this.groupeUserService.getGroupes().subscribe(
      groupes => {
        this.groupes = groupes;
      },
      error => {
        console.log('An error occurred while fetching groupes:', error);
      }
    );
  }
  

  getSelectedCheckboxId(): string[]  {
  const checkboxes = document.querySelectorAll('#idGroupe input[type="checkbox"]:checked');
  const selectedIds: string[] = [];
  checkboxes.forEach((checkbox) => {
  selectedIds.push((checkbox as HTMLInputElement).value);
  });
  return selectedIds;
  }
  

  // onSubmit() {
  //   if (this.userForm.invalid) {
  //     return;
  //   }
  //   const selectedGroupes = this.userForm.value.groupes_roles || [];
  //   const selectedIds = this.getSelectedCheckboxId();
  
  //   const newUser: UserApp = {
  //     ...this.userForm.value,
  //     groupes_roles: selectedIds,
    
  //   };
  //   // Retrieve the permissions for each selected group
  //   for (const groupId of selectedIds) {
  //     const parsedGroupId = parseInt(groupId, 10); // Convert the groupId to a number
  //     this.groupeUserService.getGroupPermissions(parsedGroupId).subscribe(
  //       permissions => {
  //         newUser.permissions = newUser.permissions.concat(permissions); // Add the retrieved permissions to the user object
  //         if (parsedGroupId === parseInt(selectedIds[selectedIds.length - 1], 10)) {
  //           // If it's the last group, create the user
  //           this.userAppService.createUserApp(newUser).subscribe(
  //             user => {
  //               console.log('User created successfully:', user);
  //               console.log("Permissions", permissions)
  //               this.router.navigate(['/listuserapp']);
  //               this.userForm.reset();
  //             },
  //             error => {
  //               console.log('An error occurred while creating user:', error);
  //             }
  //           );
  //         }
  //       },
  //       error => {
  //         console.log(`An error occurred while fetching permissions for group ${parsedGroupId}:`, error);
  //       }
  //     );
  //   }
 

  // }
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const selectedGroupes = this.userForm.value.groupes_roles || [];
    const selectedIds = this.getSelectedCheckboxId();
    const newUser: UserApp = {
      ...this.userForm.value,
      groupes_roles: selectedIds,
      permissions: [] // Initialize an empty array for storing permissions
    };
  
    // Retrieve the permissions for each selected group
    for (const groupId of selectedIds) {
      const parsedGroupId = parseInt(groupId, 10); // Convert the groupId to a number
      this.groupeUserService.getGroupPermissions(parsedGroupId).subscribe(
        permissions => {
          newUser.permissions = newUser.permissions.concat(permissions); // Add the retrieved permissions to the user object
  
          if (parsedGroupId === parseInt(selectedIds[selectedIds.length - 1], 10)) {
            // If it's the last group, create the user
            this.userAppService.createUserApp(newUser).subscribe(
              user => {
                console.log('User created successfully:', user);
                console.log("Permissions", permissions)
                this.router.navigate(['/listuserapp']);
                this.userForm.reset();
              },
              error => {
                console.log('An error occurred while creating user:', error);
              }
            );
          }
        },
        error => {
          console.log(`An error occurred while fetching permissions for group ${parsedGroupId}:`, error);
        }
      );
    }
  }
  


  
  
  
}