import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { GroupeUserService } from 'src/app/Services/Services-GroupesUser/groupe-user.service';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent {

  userForm!: FormGroup;
  groupes!: GroupeUser[];
  userId: number;
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;
  emailExistsError: boolean = false;
  modalCloseTime: number = 2000; 
  userapp$ !: Observable<any>;
  group$!: Observable<any>;// 


  constructor(
    private formBuilder: FormBuilder,
    private userAppService: UsersService,
    private groupeUserService: GroupeUserService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService
  ) {
    this.userForm = this.formBuilder.group({
      nom_user: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern('[a-zA-Z ]*') // Only alphabets and spaces allowed
      ]],
      nom: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern('[a-zA-Z ]*') // Only alphabets and spaces allowed
      ]],
      password: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      actif: [''],
      groupes_roles: [[]],
      image: [null] // Initialize image FormControl with null
    });
    this.groupes=[];
    this.userId = Number(this.route.snapshot.params['id']);

  }

  ngOnInit() {
    this.loadUserData();
    this.userapp$ = this.userAppService.getUsers();
    this.group$=this.groupeUserService.getGroupes();
   
  }

  onSubmit() {
  

      const formData = new FormData();
      formData.append('nom_user', this.userForm.get('nom_user')?.value);
      formData.append('nom', this.userForm.get('nom')?.value);
      formData.append('email', this.userForm.get('email')?.value);
      formData.append('actif', this.userForm.get('actif')?.value);
      formData.append('password', this.userForm.get('password')?.value);

      formData.append('groupes_roles', this.userForm.get('groupes_roles')?.value);
      
  
      const imageControl = this.userForm.get('image');
      if (imageControl?.value instanceof File) {
        formData.append('image', imageControl.value);
      }
  
      this.userAppService.updateUserFormdata(this.userId,formData).subscribe(
        (user: UserApp) => {
          console.log('User updated successfully:', user);
          this.openModal();
          this.router.navigate(['/listuserapp']);
          this.userForm.reset(); // Reset the form after successful submission
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error?.email) {
            this.emailExistsError = true;
          } else {
            console.error('An error occurred while updating user:', error);
          }
        }
      );
   
  }
  
  getSelectGroupsNames(selectedGroup: UserApp[]): string {
    return selectedGroup.map(group => group.nom).join(', ');
  }

  // Méthode pour gérer la sélection d'utilisateurs multiples
  onGroupSelect(event: any): void {
    const selectedGroup: GroupeUser[] = event.value;
    this.userForm.patchValue({
      groupes_roles: selectedGroup
    });
  }

  // Modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);

    // Set a timer to close the modal after the specified time
    setTimeout(() => {
      this.closeModal();
    }, this.modalCloseTime);
  }
  
  closeModal() {
    this.modalRef.hide();
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files[0]) || null;
    if (file) {
      this.userForm.get('image')?.setValue(file);
    }
  }
  loadUserData() {
    if (this.userId) {
      this.userAppService.getUserById(this.userId).subscribe(
        (user: UserApp | null) => {
          if (user) {
            console.log("User Data:", user);
            console.log("User Id:", this.userId);
            this.userForm.patchValue({
              nom_user: user.nom_user,
              nom: user.nom,
              email: user.email,
              actif: user.actif,
              groupes_roles: user.groupes_roles
            });
          } else {
            console.log("User not found for ID:", this.userId);
          }
        },
        error => {
          console.log('An error occurred while fetching user data:', error);
          // Handle the error case
        }
      );
    } else {
      console.log("Invalid user ID:", this.userId);
    }
  }
  
  
}
