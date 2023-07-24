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
      },
      error => {
        console.log('An error occurred while fetching groupes:', error);
      }
    );
  }

  loadUserData() {
    this.userAppService.getUserById(this.userId).subscribe(
      (user: UserApp) => {
        this.userForm.patchValue({
          nom_user: user.nom_user,
          nom_complet: user.nom_complet,
          password: user.password,
          email: user.email,
          actif: user.actif,
        });

        const groupesRolesFormArray = this.userForm.get('groupes_roles') as FormArray;
        for (const group of this.groupes) {
          const isSelected = user.groupes_roles.some((userGroup: GroupeUser) => userGroup.id === group.id);
          groupesRolesFormArray.push(this.formBuilder.control(isSelected));
        }
      },
      error => {
        console.log('An error occurred while fetching user data:', error);
      }
    );
  }

  getSelectedCheckboxId(): string[] {
    const groupesRolesFormArray = this.userForm.get('groupes_roles') as FormArray;
    const selectedIds: string[] = [];
    groupesRolesFormArray.controls.forEach((control: AbstractControl, index: number) => {
      if (control instanceof FormControl && control.value) {
        selectedIds.push(this.groupes[index].id.toString()); 
      }
    });
    return selectedIds;
  }
  
  

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const selectedGroupes = this.getSelectedCheckboxId();
    
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
    const selectedGroupesRoles = this.getSelectedCheckboxId();
    selectedGroupesRoles.forEach((groupId: string) => {
      formData.append('groupes_roles', groupId);
    });
    

    // Retrieve the original password value
    const password = this.userForm.value.password;

    const updatedUser: UserApp = {
      ...this.userForm.value,
      password: password
    };
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
  getGroupControl(index: number) {
    const groupesRolesFormArray = this.userForm.get('groupes_roles') as FormArray;
    return groupesRolesFormArray.controls[index] as FormControl;
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
  
}
