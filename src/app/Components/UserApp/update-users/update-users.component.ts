import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  constructor(
    private formBuilder: FormBuilder,
    private userAppService: UsersService,
    private groupeUserService: GroupeUserService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService
  ) {
    this.userId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nom_user: ['', Validators.required],
      nom_complet: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      actif: [''],
      groupes_roles: this.formBuilder.array([]),
      image: [null] // Initialize image FormControl with null
    });

    this.loadGroupes();
    this.loadUserData();
   
  }

  loadGroupes() {
    this.groupeUserService.getGroupes().subscribe(
      groupes => {
        this.groupes = groupes;
        console.log("Groupes:", this.groupes);
      },
      error => {
        console.log('An error occurred while fetching groupes:', error);
      }
    );
  }
  

  loadUserData() {
    this.userAppService.getUserById(this.userId).subscribe(
      (user: UserApp) => {
        console.log("User Data:", user);
        const groupesRolesFormArray = this.userForm.get('groupes_roles') as FormArray;

        
        this.userForm.patchValue({
          nom_user: user.nom_user,
          nom_complet: user.nom_complet,
          password: user.password,
          email: user.email,
          actif: user.actif,
        });
  
  
        // Ensure the FormArray has the same length as the 'groupes' array
        while (groupesRolesFormArray.length !== this.groupes.length) {
          groupesRolesFormArray.push(this.formBuilder.control(false));
        }
  
        // Reset the FormArray controls before setting the selected groups
        for (let i = 0; i < groupesRolesFormArray.length; i++) {
          groupesRolesFormArray.controls[i].setValue(false);
        }
  
        // Set the selected groups
        for (const group of user.groupes_roles) {
          const groupIndex = this.groupes.findIndex((g) => g.id === group.id);
          if (groupIndex !== -1) {
            groupesRolesFormArray.controls[groupIndex].setValue(true);
          }
        }
  
        // Add console log to show selected groups
      const selectedGroups = this.groupes.filter((group, index) => groupesRolesFormArray.controls[index].value);
      console.log("Groupes:", this.groupes);
      console.log("User Groups:", user.groupes_roles);
      console.log("Selected Groups:", selectedGroups);
      },
      error => {
        console.log('An error occurred while fetching user data:', error);
      }
    );
  }
  

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    
    const formData = new FormData();

    formData.append('id', this.userId.toString()); // Ensure the 'id' is set in the formData
    formData.append('nom_user', this.userForm.get('nom_user')?.value);
    formData.append('nom_complet', this.userForm.get('nom_complet')?.value);
    formData.append('password', this.userForm.get('password')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    formData.append('actif', this.userForm.get('actif')?.value);

    const file = this.userForm.get('image')?.value;
    if (file instanceof File) {
      formData.append('image', file, file.name);
    }

    //the group selected 
    const selectedGroups = this.userForm.value.groupes_roles
    .map((isChecked: boolean, index: number) => (isChecked ? this.groupes[index].id : null))
    .filter((groupId: number | null) => groupId !== null);

  formData.append('selectedGroups', JSON.stringify(selectedGroups));


    console.log("data", formData);

    this.userAppService.updateUserFormdata(formData).subscribe(
      (user: UserApp) => {
        console.log('User updated successfully:', user);
        this.openModal();
        this.router.navigate(['/listuserapp']);
        this.userForm.reset();
      },
      (error: any) => {
        console.log('An error occurred while updating user:', error);
      }
    );
  }

  // Modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
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
    // Function to get the FormControls within the groupes_roles FormArray
    getGroupControl(index: number): FormControl {
      const groupesRolesFormArray = this.userForm.get('groupes_roles') as FormArray;
      return groupesRolesFormArray.at(index) as FormControl;
    }
  
}
