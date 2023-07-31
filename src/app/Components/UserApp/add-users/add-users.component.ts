import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
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
  modalCloseTime: number = 2000;
  userapp$ !: Observable<any>;
  group$!: Observable<any>;
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

     
  ) { 
    this.userForm = this.formBuilder.group({
      image: [''],
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
      groupes_roles: [[]], 
      send_email: [false],
    });
    this.groupes=[];

  }

  ngOnInit() {
   
    this.userapp$ = this.userAppService.getUsers();
    this.group$=this.groupeUserService.getGroupes();
  }



  onSubmit() {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('nom_user', this.userForm.get('nom_user')?.value);
      formData.append('nom', this.userForm.get('nom')?.value);
      formData.append('password', this.userForm.get('password')?.value);
      formData.append('email', this.userForm.get('email')?.value);
      formData.append('actif', this.userForm.get('actif')?.value);
      formData.append('send_email', this.userForm.get('send_email')?.value);
      formData.append('image', this.userForm.get('image')?.value);
      formData.append('groupes_roles',this.userForm.get('groupes_roles')?.value);

      this.userAppService.createUserApp(formData).subscribe(
        (createdUser: UserApp) => {
          this.openModal();
          this.router.navigate(['/listuserapp']);
          console.log('User created:', createdUser);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error?.email) {
            this.emailExistsError = true;
          } else {
            console.error('An error occurred while creating user:', error);
          }
        }
      );
    } else {
      console.warn('Form is invalid. Cannot submit.');
    }
  }

  
  getSelectedGroupsNames(selectedGroup: GroupeUser[]): string {
    return selectedGroup.map(group => group.nom).join(', ');
  }

  onGroupSelect(event: any): void {
    const selectedGroup: GroupeUser[] = event.value;
    this.userForm.patchValue({
      groupes_roles: selectedGroup
    });
  }
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