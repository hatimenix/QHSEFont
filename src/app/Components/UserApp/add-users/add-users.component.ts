import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
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
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nom_user: ['', Validators.required],
      nom_complet: ['', Validators.required],
      password: ['', Validators.required],
      adresse_email: ['', [Validators.required, Validators.email]],
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
  
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
  
    const selectedGroupes = this.userForm.value.groupes_roles || [];
    console.log("selected groups are ", selectedGroupes); // Default to an empty array if no groups are selected
    const selectedIds = this.getSelectedCheckboxId();
    console.log('Selected IDs:', selectedIds);
    const groupeUsers = this.groupes
      .filter(group => selectedGroupes.includes(group.id.toString()))
      .map(group => ({ id: group.id }));
  
    const newUser: UserApp = {
      ...this.userForm.value,
    
      groupes_roles: selectedIds,
    };
  
    this.userAppService.createUserApp(newUser).subscribe(
      user => {
        console.log('User created successfully:', user);
        
        this.router.navigate(['/listuserapp']); 
        this.userForm.reset();
      },
      error => {
        console.log('An error occurred while creating user:', error);
      }
    );
  }
 
}
