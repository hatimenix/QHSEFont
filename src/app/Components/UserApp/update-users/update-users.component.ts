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
  @ViewChild('successModal', { static: true }) successModal:any;
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
      
      groupes_roles: this.formBuilder.array([])
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

    const updatedUser: UserApp = {
      ...this.userForm.value,
      groupes_roles: selectedIds
    };

    this.userAppService.updateUserApp(this.userId, updatedUser).subscribe(
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

    //modal functions 
    openModal() {
      this.modalRef = this.bsModalService.show(this.successModal);
    }
    closeModal() {
      this.bsModalService.hide();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.userForm.get('image')?.setValue(file);
  }
}
