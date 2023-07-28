import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  private modalCloseTime: number = 2000;
   //modal
   @ViewChild('successModal', { static: true }) successModal:any;
   modalRef!: BsModalRef;
  emailExistsError: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userAppService: UsersService,
    private groupeUserService: GroupeUserService,
    private router: Router,
    private http: HttpClient, 
    private permissionService: PermissionService, 
    private bsModalService: BsModalService,

     
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      image: ['', [Validators.required, this.validateImageFileType]],
      nom_user: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern('[a-zA-Z ]*') // Only alphabets and spaces allowed
      ]],
      nom: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern('[a-zA-Z ]*') // Only alphabets and spaces allowed
      ]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}')]],
      email: ['', [Validators.required, Validators.email]],
      actif: [false],
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
    const selectedIds = this.getSelectedCheckboxId();
    const newUser: UserApp = {
      ...this.userForm.value,
      groupes_roles: selectedIds,
      permissions: [] // Initialize an empty array for storing permissions
    };
  
    const formData = new FormData();
    formData.append('nom_user', this.userForm.get('nom_user')?.value);
    formData.append('nom', this.userForm.get('nom')?.value);
    formData.append('password', this.userForm.get('password')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    formData.append('actif', this.userForm.get('actif')?.value);
    formData.append('send_email', this.userForm.get('send_email')?.value);
    formData.append('image', this.userForm.get('image')?.value);

    //the group selected 
    const selectedGroupesRoles = this.getSelectedCheckboxId();
    selectedGroupesRoles.forEach((groupId: string) => {
      formData.append('groupes_roles', groupId);
    });
    
  
    // Retrieve the permissions for each selected group
    for (const groupId of selectedIds) {
      const parsedGroupId = parseInt(groupId, 10); // Convert the groupId to a number
      this.groupeUserService.getGroupPermissions(parsedGroupId).subscribe(
        permissions => {
  
          if (parsedGroupId === parseInt(selectedIds[selectedIds.length - 1], 10)) {
            // If it's the last group, create the user
            this.userAppService.createUserApp(formData).subscribe(
              user => {
                console.log('User created successfully:', user);
                this.openModal();
                this.router.navigate(['/listuserapp']);
                this.userForm.reset();
              },
              error => {
                if (error.status === 400 && error.error?.email) {
                
                  this.emailExistsError = true;
                } else {
                  console.log('An error occurred while creating user:', error);
                }
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
  
  // Inside your component class
// 

  //modal functions 
  
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);

    // Set a timer to close the modal after the specified time
    setTimeout(() => {
      this.closeModal();
    }, this.modalCloseTime);
  }
  closeModal() {
    this.bsModalService.hide();
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.userForm.get('image')?.setValue(file);
}
  
    // Custom image validator function
    validateImageFileType(control: AbstractControl): { [key: string]: boolean } | null {
      if (control.value instanceof File) {
        const file = control.value as File;
        const allowedFormats = ['jpg', 'jpeg', 'png'];
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.split('.').pop();
  
        if (!fileExtension || !allowedFormats.includes(fileExtension)) {
          return { invalidImageFormat: true };
        }
      }
      return null;
    }
    

  
  
}