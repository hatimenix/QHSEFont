import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      image: [''] // Add the image FormControl
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
      user => {
        this.userForm.patchValue(user);
      },
      error => {
        console.log('An error occurred while fetching user data:', error);
      }
    );
  }

  getSelectedCheckboxId(): string[] {
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

    const groupeUsers = this.groupes
      .filter(group => selectedGroupes.includes(group.id.toString()))
      .map(group => ({ id: group.id }));

    const formData = new FormData();
    formData.append('id', this.userForm.get('id')?.value);
    formData.append('nom_user', this.userForm.get('nom_user')?.value);
    formData.append('nom_complet', this.userForm.get('nom_complet')?.value);
    formData.append('password', this.userForm.get('password')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    formData.append('actif', this.userForm.get('actif')?.value);
    const file = this.userForm.get('image')?.value;
    if (file instanceof File) {
      formData.append('image', file, file.name);
    }    
    
    
    const selectedGroupesRoles = this.getSelectedCheckboxId();
    selectedGroupesRoles.forEach((groupId: string) => {
      formData.append('groupes_roles', groupId);
    });
    
    // Retrieve the original password value
    const password = this.userForm.value.password;

    const updatedUser: UserApp = {
      ...this.userForm.value,
      password: password, // Set the original password value
      groupes_roles: selectedIds
    };

    this.userAppService.updateUserApp(this.userId, updatedUser, formData).subscribe(
      user => {
        console.log('User updated successfully:', user);
        this.openModal();
        this.router.navigate(['/listuserapp']);
        this.userForm.reset();
      },
      error => {
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.userForm.patchValue({ image: file });
  }

  //get the image 
  getImageUrl(): string {
    const imageControl = this.userForm.get('image');
    if (imageControl && imageControl.value) {
      const file = imageControl.value;
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
    }
    return '';
  }
  
}
