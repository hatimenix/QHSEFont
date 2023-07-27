import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { GroupeUserService } from 'src/app/Services/Services-GroupesUser/groupe-user.service';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { UserApp } from 'src/app/models/UserApp';


@Component({
  selector: 'app-ad-groupes',
  templateUrl: './ad-groupes.component.html',
  styleUrls: ['./ad-groupes.component.css']
})
export class AdGroupesComponent {
  groupForm: FormGroup;
  users: UserApp[];
  userapp$ !: Observable<any>;
  group$!: Observable<any>;
  errorMessage: string | undefined;
  //set time for modal
  private modalCloseTime: number = 2000; // 


  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private groupService: GroupeUserService,
    private router: Router,
    private bsModalService: BsModalService, 
  ) {
    this.groupForm = this.formBuilder.group({
      nom: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern('[a-zA-Z ]*') // Only alphabets and spaces allowed
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]],
      proprietaire_groupe: [[]],
      groupe_name:[''], 
      autorisation:['']
    });
    this.users = [];
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.userapp$ = this.userService.getUsers();
    this.group$=this.groupService.getGroupes();
  }
 

  onSubmit(): void {
    if (this.groupForm.valid) {
      const selectedAutorisation = this.groupForm.value.autorisation; // Get the selected autorisation value

      const newGroup: GroupeUser = {
        nom: this.groupForm.value.nom,
        description: this.groupForm.value.description,
        proprietaire_groupe: this.groupForm.value.proprietaire_groupe,
        proprietaire_groupe_names: '',
        membres_names: '',
        id: 0,
        groupe_name: '', 
        autorisation:selectedAutorisation
      };
      

      // newGroup.proprietaire_groupe_names = this.getSelectedUserNames(newGroup.proprietaire_groupe);
      this.groupService.createGroupeUser(newGroup).subscribe(createdGroup => {
        this.openModal();
        this.router.navigate(['/listgroupeusers']); 
        console.log('Groupe utilisateur créé :', createdGroup);
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de groupe", error);
         // Check for 500 Internal Server Error
      if (error.status === 500 && error.error) {
        this.errorMessage = "Ce nom de group existe déjà";
        } else {
          // Handle other errors, if needed
          console.log('An error occurred:', error);
        }

        if (error.status === 400 && error.error && error.error.nom) {
          // Display the custom error message from the backend
          this.errorMessage = "Ce nom de groupe existe déjà";
        } else {
          // Handle other errors, if needed
          console.log('An error occurred:', error);
        }
      }
      );
    }
  }

  getSelectedUserNames(selectedUsers: UserApp[]): string {
    return selectedUsers.map(user => user.nom_complet).join(', ');
  }

  // Méthode pour gérer la sélection d'utilisateurs multiples
  onUserSelect(event: any): void {
    const selectedUsers: UserApp[] = event.value;
    this.groupForm.patchValue({
      proprietaire_groupe: selectedUsers
    });
  }

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
  


}
